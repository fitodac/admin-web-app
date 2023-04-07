import { useState } from 'react'
import { useDispatch } from 'react-redux'
import createTaskList from '../../utils/createTaskList'
import updateTasksList from '../../utils/updateTasksList'
import deleteTaskList from '../../utils/deleteTaskList'
import { setLoading } from '../../reducers/app/appSlice'

import Input from '../Form/Input'
import InputNumber from '../Form/InputNumber'
import Button from '../Button/Button'

import style from './TaskList.module.css'


const Form = props => {

	const dispatch = useDispatch()
	const [tasklist, setTaskList] = useState({
		project_id: Number(props.data.project_id),
		name: props.data.name,
		order: props.data.order,
	})



	const handleInput = (val, idx) => {
		const obj = {...tasklist}
		obj[idx] = val
		setTaskList(obj)
	}


	const closeModal = () => {
		setTaskList({name: ''})
		props.closeModal()
	}


	const destroyTaskList = async () => {
		dispatch(setLoading(true))
		await deleteTaskList(props.data.id, props.data.project_id)
		props.closeModal()
		dispatch(setLoading(false))
	}


	const handleSubmit = async e => {
		e.preventDefault()
		dispatch(setLoading(true))

		// Edit
		if( props.data.id ){
			await updateTasksList({
				...tasklist,
				id: props.data.id
			})

		// Create
		}else{
			await createTaskList({...tasklist})
		}

		await props.updateTasksLists()
		// dispatch(setLoading(false))
		props.closeModal()
	}


	return (<>
		<div className={ style.modal }>
			<form method="post" onSubmit={ handleSubmit }>

				<div className="grid gap-y-6">
					<h3 className="text-slate-500 text-lg leading-none">Lista de tareas</h3>

					<div className="form-wrapper">
						<div>
							<Input 
								name="name"
								value={ tasklist.name } 
								label="Nombre"
								onChange={ e => handleInput(e, 'name') } />
							
							<div className="flex gap-x-5 justify-end mr-2 mt-2">
							{ props.data.id ? 
								(<div className="text-slate-500 text-sm font-medium leading-none">{ `id: ${props.data.id}` }</div>) :
								null}
							</div>
							
						</div>

						<div>
							<div className="w-1/2">
								<InputNumber 
									name="order"
									value={ tasklist.order } 
									label="Orden"
									onChange={ e => handleInput(e, 'order') } />
							</div>
						</div>
					</div>



					<div className="flex justify-end gap-x-4 mt-6">
						<Button 
							text="Cancelar" 
							action={ closeModal } />

						<Button 
							text="Guardar"
							type="submit" />
					</div>



					{props.data.id ? 
						(<div className="flex justify-end gap-x-4 mt-20">
							<Button 
								text="Eliminar lista"
								action={ destroyTaskList } />
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