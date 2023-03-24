import { useState, useEffect } from 'react'
import { useLoaderData, Form } from 'react-router-dom'
import getProject from '../../utils/getProject'
import deleteProject from '../../utils/deleteProject'

import { useDispatch } from 'react-redux'
import { setLoading } from '../../reducers/app/appSlice'

import Header from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'



const loader = async ({ params }) => params.id


const action = async ({ request }) => {
	const formData = await request.formData()
	const form = Object.fromEntries(formData)
	deleteProject(form.id)
	
	return null
}


const Project = () => {
	
	const id = useLoaderData()
	const [project, setProject] = useState({})
	const dispatch = useDispatch()

	const { 
		name,
		uuid,
		description,
		user,
		team,
		order,
		status
	} = project


	useEffect(() => {
		dispatch(setLoading(true))
		
		const fetchData = async () => {
			const data = await getProject(id)
			setProject(data)
			dispatch(setLoading(false))
		}

		const resp = fetchData()
	}, [])



	return (
		<>
			<Header title="Proyecto"/>

			<div className="page-content">
				<div className="grid grid-cols-12 gap-x-10">

					<div className="col-span-6">
						<div className="grid gap-y-7">

							<div>
								<div className="text-2xl flex gap-x-3 items-end">
									{ name }
									{ 'closed' === status ? (<span className="text-red-700 text-sm font-bold">cerrado</span>) : null }
								</div>
								<div className="text-xs text-slate-500">{ uuid }</div>

								<div className="mt-3">
									<div dangerouslySetInnerHTML={{__html: description}} />
								</div>
							</div>

						</div>


						<div className="grid gap-y-3 mt-10">
							<div>{ `Cliente: ${ user?.company }` }</div>
							<div>{ `Team: ${ team }` }</div>
							<div>{ `Estado: ${ status }` }</div>
						</div>
						
						
						<div className="mt-12 flex justify-between gap-x-6">
							<Button 
								text="Editar"
								to={ `/projects/edit/${id}` } />
						</div>
					</div>

				</div>
			</div>
		</>
	)
}


export { loader }
export default Project