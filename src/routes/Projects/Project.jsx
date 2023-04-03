import { useState, useEffect } from 'react'
import { useLoaderData, Form } from 'react-router-dom'
import getProject from '../../utils/getProject'
import deleteProject from '../../utils/deleteProject'
import getTasksLists from '../../utils/getTasksLists'

import { useDispatch } from 'react-redux'
import { setLoading } from '../../reducers/app/appSlice'

import Header from '../../components/PageHeader/PageHeader'
import Navbar from '../../components/Projects/Navbar/Navbar'
import Button from '../../components/Button/Button'
import TaskListForm from '../../components/TaskList/Form'

import style from './Projects.module.css'


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
	const [tasks, setTasks] = useState([])
	const dispatch = useDispatch()
	const [task_list_modal, setTaskListModal] = useState(false)
	const [cur_taskList, setCurTaskList] = useState({
		project_id: id,
		name: '',
		order: 0
	})



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
			const tasksData = await getTasksLists(id)
			setProject(data)
			setTasks(tasksData)
			dispatch(setLoading(false))
		}

		const resp = fetchData()
	}, [])



	const editTaskList = e => {
		setCurTaskList({
			...cur_taskList,
			name: e.name,
			order: e.order,
			id: e.id
		})
		setTaskListModal(true)
	}




	return (
		<>
			<Header title="Proyecto"/>


			<Navbar />


			<div className="page-content">
				<div className="w-[500px] grid gap-y-10">
					{ (tasks && tasks.length > 0) ? 
						tasks.map(list => (
							<div 
								key={ list.id } 
								className={ style['task-list'] }>
									<div className={ style['task-list--header'] }>
										<span className={ style['task-list--name'] }>
											<span>{ list.name }</span>
											<small>{ list.id }</small>
										</span>
										
										<Button 
											text="Editar"
											size="small"
											action={ () => editTaskList(list) } />
									</div>
							</div>
						)) : 
						(<div className="">No hay tareas</div>) }
					<div>
						<Button 
							text="Nueva lista de tareas"
							action={ () => setTaskListModal(true) } />
					</div>
				</div>




				<div className="grid grid-cols-12 gap-x-10 mt-20">

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



				{ task_list_modal ? 
					(<TaskListForm 
						data={ cur_taskList }
						closeModal={ list => {
							console.log('list', list)
							setTaskListModal(false)
						} }
						/>) :
					null}
				
			</div>
		</>
	)
}


export { loader }
export default Project