import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { setLoading } from '../../reducers/app/appSlice'
import getTasksLists from '../../utils/getTasksLists'
import { supabase } from '../../supabaseClient'

import Project from './Project'
import TaskListForm from '../../components/TaskList/Form'
import TaskForm from '../../components/Task/Form'
import Button from '../../components/Button/Button'

import style from './Projects.module.css'



const TasksList = () => {

	const dispatch = useDispatch()
	const id = useLoaderData()
	const [tasklists, setTaskLists] = useState([])
	const [task_list_modal, setTaskListModal] = useState(false)
	const [task_modal, setTaskModal] = useState(false)
	const [cur_taskList, setCurTaskList] = useState({
		project_id: id,
		name: '',
		order: 0
	})
	const [cur_task, setCurTask] = useState({})


	useEffect(() => {
		dispatch(setLoading(true))
		
		const fetchData = async () => {
			const data = await getTasksLists(id)
			setTaskLists(data.tasklists)
			dispatch(setLoading(false))
		}

		const resp = fetchData()
	}, [])


	const updateTasksLists = async () => {
		const data = await getTasksLists(id)
		setTaskLists(data.tasklists)
		dispatch(setLoading(false))
		return
	}



	const editTaskList = e => {
		setCurTaskList({
			...cur_taskList,
			name: e.name,
			order: e.order,
			id: e.id
		})
		setTaskListModal(true)
	}


	const newTaskList = () => {
		setCurTaskList({order: 0})
		setTaskListModal(true)
	}




	const editTask = (task, list) => {
		setCurTaskList({
			...cur_taskList,
			name: list.name,
			order: list.order,
			id: list.id
		})
		setCurTask(task)
		setTaskModal(true)
	}


	const newTask = list => {
		setCurTaskList({
			...cur_taskList,
			name: list.name,
			order: list.order,
			id: list.id
		})
		setCurTask({order: 0})
		setTaskModal(true)
	}


	return (
		<Project>
			<div className="w-[500px] grid gap-y-8">
				{ (tasklists && tasklists.length > 0) ? 
					tasklists.map(list => (
						<div 
							key={ list.id } 
							className={ style['task-list'] }>
								<div className={ style['task-list--header'] }>
									<span className={ style['task-list--name'] }>
										<span>{ list.name }</span>
										<small>{ list.id }</small>
									</span>
									
									<div className={ style['task-list--btn-edit'] }>
										<Button 
											text="Editar"
											size="small"
											action={ () => editTaskList(list) } />
									</div>
								</div>


								{ // Tasks:
									list.tasks.length > 0 ? 
									(<div className={ style.tasks }>
										{ list.tasks.map(task => {

												let desc = ''

												if( task.description ){
													desc = task.description.substring(0,130)
													if( desc.length === 130 ) desc += '…'
												}

												return (
													<div 
														key={ task.id }
														className={ style['task-item'] }>
														<div className={ task.priority === 'high' ? `${style['task-body']} ${style['task-high-priority']}` : style['task-body'] }>
															<div className={ style['task-item--header']}>
															
																<div className="flex gap-x-3">
																	<div 
																		className={ style['task-item--name']}
																		onClick={ () => editTask(task, list) }>
																		{ task.name }
																		<small>{ task.id }</small>
																	</div>


																	<div className={ style['task-item--status'] }>
																		<span className={ style[task.status] }>
																			{ 'pending' === task.status ? 'Pendiente' : 'active' === task.status ? 'Activo' : 'closed' === task.status ? 'Cerrado' : '' }
																		</span>
																	</div>
																</div>

																<div className={ style['task-item--order']}>
																	{ task.order }
																</div>

															</div>

															<div 
																className={ style['task-item--description']}
																dangerouslySetInnerHTML={{__html: desc}}/>
														</div>
													</div>)
											}) }
									</div>) : 
									(<div className="">
										<div 
											className="text-slate-600 text-sm leading-tight font-medium mt-2">
											Aún no hay tareas en esta lista
										</div>
									</div>)}


								<div className={ style['task-list--footer'] }>
									<Button 
										text="Nueva tarea"
										action={ () => newTask(list) } />
								</div>
								
						</div>
					)) : 
					(<div className="">No hay tareas</div>) }


				<div className="mt-6 flex justify-end">
					<Button 
						text="Nueva lista de tareas"
						action={ newTaskList } />
				</div>
			</div>



			{ task_list_modal ? 
				(<TaskListForm 
					data={ cur_taskList }
					updateTasksLists={ updateTasksLists }
					closeModal={ () => setTaskListModal(false) }
					/>) :
				null}



			{ task_modal ? 
				(<TaskForm 
					tasklist={ cur_taskList }
					list={ tasklists }
					data={ cur_task }
					updateTasksLists={ updateTasksLists }
					closeModal={ () => setTaskModal(false) }
					/>) : 
				null}
			
		</Project>
	)
}


export default TasksList