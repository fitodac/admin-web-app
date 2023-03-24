import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { listProjects, listProjectsPagination } from '../../utils/listProjects'

import { useDispatch } from 'react-redux'
import { setLoading } from '../../reducers/app/appSlice'

import Header from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'

import style from './Projects.module.css'


const columns = [
	{
		name: '#',
		selector: row => row.id,
		sortable: true
	},
	{
		name: 'Proyecto',
		cell: row => ( <Link 
										className="text-base font-bold"
										to={`/projects/${ row.id }`}>{ row.name }</Link> ),
		sortable: true
	},
	{
		name: 'Empresa',
		cell: row => ( <Link to={`/users/${ row.user?.id }`}>{ row.user?.company }</Link> ),
		sortable: true
	},
	{
		name: 'Fecha',
		selector: row => {
			const date = new Date(row.created_at)
			return date.toLocaleString('es', {
				month: 'short',
				day: '2-digit',
				year: 'numeric'
			})
		},
		sortable: true
	}
]



const ProjectsList = () => {

	const [list, setList] = useState([])
	const [pagination, setPagination] = useState([])
	const [current_page, setCurrentPage] = useState(1)
	const dispatch = useDispatch()


	const getPage = async n => {
		dispatch(setLoading(true))
		
		const fetchData = async () => {
			const data = await listProjects(n, `
				id, 
				name,
				user (
					id,
					company
				),
				created_at
			`)
			setList(data)

			setCurrentPage(n)
			dispatch(setLoading(false))
		}

		return fetchData()
	}


	useEffect(() => {
		dispatch(setLoading(true))

		const setPages = async () => {
			await getPage(0)
			const pages = await listProjectsPagination()
			setPagination(pages)
			setCurrentPage(1)
		}

		setPages()
	}, [])




	return (
		<>
			<Header title="Lista de proyectos" />

			<div className="page-content">
				
				<div className="pb-10 flex justify-end">
					<Button 
						text="Nuevo proyecto"
						to={ `/projects/add` } />
				</div>

				<DataTable columns={columns} data={list}/>

				{ pagination.length > 0 ?
					(<ul className="flex justify-end gap-x-1 mt-6">
						{ pagination.map(i => (
							<li 
								key={`page-item-${i}`}
								className={ 
									current_page === i ? 
									`bg-slate-700 text-sm font-bold w-7 h-7 grid place-content-center rounded-md select-none pointer-events-none` :
									`bg-slate-900 text-sm font-bold w-7 h-7 grid place-content-center rounded-md cursor-pointer select-none` 
								}
								onClick={ () => getPage(i) }>{i}</li>
						))}
					</ul>): 
					null
				}
			</div>
	</>
	)
}

export default ProjectsList