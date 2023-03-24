import { useState, useEffect } from 'react'
import { getTotalRecords } from '../../utils/dashboard'

import { useDispatch } from 'react-redux'
import { setLoading } from '../../reducers/app/appSlice'

import Header from '../../components/PageHeader/PageHeader'



const Dashboard = () => {

	const [projects, setProjects] = useState()
	const [clients, setClients] = useState()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setLoading(true))

		const fetchData = async () => {
			const tot_projects = await getTotalRecords('projects')
			const tot_users = await getTotalRecords('users')
			setProjects(tot_projects)
			setClients(tot_users - 1)

			dispatch(setLoading(false))

			return
		}

		fetchData()
	}, [])


	return (
		<div className="">
			<Header title="Dashboard" />

			<div className="page-content">
				<div className="grid grid-cols-4 gap-5">
					
					<div className="bg-slate-900 px-5 py-4 grid gap-y-1 rounded-md">
						<div className="text-4xl leading-none">{ projects }</div>
						<div className="	text-slate-400 text-xs leading-tight font-bold uppercase">proyectos</div>
					</div>

					<div className="bg-slate-900 px-5 py-4 grid gap-y-1 rounded-md">
						<div className="text-4xl leading-none">{ clients }</div>
						<div className="	text-slate-400 text-xs leading-tight font-bold uppercase">clientes</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Dashboard