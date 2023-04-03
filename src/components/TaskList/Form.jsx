import { useState } from 'react'
import { useDispatch } from 'react-redux'
import createTaskList from '../../utils/createTaskList'
import updateTasksLists from '../../utils/updateTasksLists'
import deleteTaskList from '../../utils/deleteTaskList'
import { setLoading } from '../../reducers/app/appSlice'

import Input from '../Form/Input'
import Button from '../Button/Button'

import style from './TaskList.module.css'


const Form = props => {

	const dispatch = useDispatch()
	const [tasklist, setTaskList] = useState({
		name: props.data.name,
		order: props.data.order
	})
	const [list, setList] = useState([])



	const handleInput = (val, idx) => {
		const obj = {...tasklist}
		obj[idx] = val
		setTaskList(obj)
	}


	const closeModal = () => {
		setTaskList({...tasklist, name: ''})
		props.closeModal()
	}


	const destroyTaskList = async () => {
		dispatch(setLoading(true))
		await deleteTaskList(props.data.id, props.data.project_id)
		props.closeModal(list)
		dispatch(setLoading(false))
	}


	const handleSubmit = async e => {
		e.preventDefault()
		dispatch(setLoading(true))

		// Edit
		if( props.data.id ){
			const resp = await updateTasksLists({
				...tasklist,
				id: props.data.id
			})

			setList(resp)
		// Create
		}else{
			const resp = await createTaskList({
				...tasklist,
				project_id: Number(props.data.project_id)
			})

			setList(resp)
		}

		dispatch(setLoading(false))
		props.closeModal(list)
	}


	return (<>
		<div className={ style.modal }>
			<form method="post" onSubmit={ handleSubmit }>

				<div className="grid gap-y-6">
					<h3 className="text-slate-500 text-lg leading-none">Lista de tareas</h3>

					<div className="form-wrapper">
						<Input 
							name="name"
							value={ tasklist.name } 
							label="Nombre"
							onChange={ e => handleInput(e, 'name') } />
					</div>

					<div>{ `id: ${props.data.id}` }</div>


					<div className="flex justify-end gap-x-4">
						<Button 
							text="Cancelar" 
							action={ closeModal } />

						<Button 
							text="Guardar"
							type="submit" />
					</div>

					{props.data.id ? 
						(<div className="flex justify-end gap-x-4 mt-32">
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