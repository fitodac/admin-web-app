import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import createTask from '../../utils/createTask'
import updateTask from '../../utils/updateTask'
import deleteTask from '../../utils/deleteTask'
import { setLoading } from '../../reducers/app/appSlice'

import Input from '../Form/Input'
import InputNumber from '../Form/InputNumber'
import Editor from '../Form/Quill'
import Select from '../Form/Select'
import Button from '../Button/Button'
import ButtonGroup from '../Button/ButtonGroup'

import style from './Task.module.css'


const Form = props => {

	const dispatch = useDispatch()
	const [task, setTask] = useState({
		name: props.data.name,
		description: props.data.description,
		status: props.data.status,
		list_id: props.tasklist.id,
		assignee: null,
		subscribers: null,
		priority: props.data.priority ?? 'normal',
		order: props.data.order
	})
	
	const {
		name,
		description,
		status,
		order,
		priority
	} = task

	const list_name = props.tasklist.name
	const list = props.list.map(e => ({value: e.id, label: e.name}))



	const handleInput = (val, idx) => {
		const obj = {...task}
		obj[idx] = val
		setTask(obj)
	}

	/**
	const handleInputToArray = (e, idx) => {
		const _task = {...task}
		
		if( e.checked && !_task[idx].includes(e.value) )
			_task[idx].push(e.value)
		else
			_task[idx] = _task[idx].filter(a => a !== e.value)
		setTask({..._task})
	}
	*/


	const closeModal = () => {
		setTask({})
		props.closeModal()
	}

	const handleChangeList = val => {
		setTask({...task, list_id: val})
	}


	const destroyTask = async () => {
		dispatch(setLoading(true))
		await deleteTask(props.data.id)
		await props.updateTasksLists()
		props.closeModal()
	}


	const handleSubmit = async e => {
		e.preventDefault()
		dispatch(setLoading(true))

		// Edit
		if( props.data.id ){
			await updateTask({
				...task,
				id: props.data.id
			})

		// Create
		}else{
			await createTask({...task})
		}

		await props.updateTasksLists()
		props.closeModal()
	}


	return (<>
		<div className={ style.modal }>
			<form method="post" onSubmit={ handleSubmit }>

				<div className="grid gap-y-6">
					<h3 className="text-slate-500 text-lg leading-none">Tarea</h3>

					<div className="form-wrapper">
						<div>
							<Input 
								name="name"
								value={ name } 
								label="Nombre"
								required
								onChange={ e => handleInput(e, 'name') } />
							
							<div className="flex gap-x-5 justify-end mr-2 mt-2">
								<div className="text-slate-500 text-sm font-medium leading-none">{ `Lista: ${list_name}` }</div>
								<div className="text-slate-500 text-sm font-medium leading-none">{ `id: ${props.data.id}` }</div>
							</div>
						</div>

						<div>
							<Editor 
								value={ description }
								label="Descripción"
								required
								name="description"
								onChange={ e => handleInput(e, 'description') } />
						</div>

						<div>
							<ButtonGroup 
								label="Estado"
								value={ status }
								name="status"
								type="radio"
								options={[
									{ label: 'Pendiente', value: 'pending' },
									{ label: 'En curso', value: 'active' },
									{ label: 'Cerrado', value: 'closed' }
								]}
								onChange={ e => handleInput(e, 'status') }
								/>
						</div>

						<div>
							<label className="cursor-pointer">
								<input 
									type="checkbox"
									name="priority"
									value="high"
									checked={ 'high' === priority }
									onChange={ e => setTask({
										...task, 
										priority: e.target.checked ? 'high' : 'normal'
									})} />
								<span className="pl-3">Prioridad alta</span>
							</label>
						</div>

						<div className="flex justify-between gap-x-5">
							<div className="w-1/4">
								<InputNumber 
									name="order"
									value={ order } 
									label="Orden"
									onChange={ e => handleInput(e, 'order') } />
							</div>

							<div className="w-1/2">
								<Select 
									label="Lista de tareas"
									value={ task.list_id }
									options={ list }
									onChange={ handleChangeList } />
							</div>
						</div>




						<div className="flex justify-end gap-x-4 mt-6">
							<Button 
								text="Cancelar" 
								action={ closeModal } />

							<Button
								text="guardar"
								type="submit"/>
						</div>

					</div>



					{props.data.id ? 
						(<div className="flex justify-end gap-x-4 mt-20">
							<Button 
								text="Eliminar tarea"
								action={ destroyTask } />
						</div>): 
						null}

				</div>
			</form>

		</div>

		<div 
			className="overlay"
			onClick={ () => closeModal() }></div>
	</>)
}

export default Form