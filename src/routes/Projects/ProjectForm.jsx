import { useEffect, useState } from 'react'
import { 
	useLoaderData, 
	Form,
	redirect 
} from 'react-router-dom'
import getProject from '../../utils/getProject'
import { listUsers } from '../../utils/listUsers'
import createProject from '../../utils/createProject'
import updateProject from '../../utils/updateProject'
import deleteProject from '../../utils/deleteProject'

import { useDispatch } from 'react-redux'
import { setLoading } from '../../reducers/app/appSlice'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import Header from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import Input from '../../components/Form/Input'
import Select from '../../components/Form/Select'

import style from './Projects.module.css'


const loader = ({ params }) => params.id ?? null


const action = async ({ params, request }) => {
	const formData = await request.formData()
	const form = Object.fromEntries(formData)
	let project = null

	if( params.id ){
		project = await updateProject({...form, id: params.id})
	}else{
		project = await createProject(form)
	}

	return redirect(`/projects/${ project.id }`)
}



const ProjectForm = () => {
	
	const id = useLoaderData()
	const [project, setProject] = useState({})
	const [users, setUsers] = useState([])
	const dispatch = useDispatch()




	useEffect(() => {
		const fetchUsers = async () => {
			const get_users = await listUsers('id, company')
			const users_list = []
			get_users.forEach(e => users_list.push({ value: e.id, label: e.company}))
			setUsers([...users_list])
		}

		fetchUsers()

		
		if( id ){
			dispatch(setLoading(true))


			const fetchData = async () => {
				const data = await getProject(id)	
				setProject({...data, id, user: data.user.id})
				dispatch(setLoading(false))
			}

			fetchData()
		}
	}, [])


	const handleInput = (val, idx) => {
		const obj = {...project}
		obj[idx] = val
		setProject(obj)
		
		// if( errors && errors[idx] ) errors[idx].value = null
	}


	const {
		name,
		order,
		team,
		status,
		closing_reason,
		description,
		uuid,
		user
	} = project


	const d = new Date()
	const ios_string = d.toISOString()
	const today = ios_string.slice(0, 16)


	const handleDescription = value => {
		if( Object.keys(project).length ) setProject({...project, description: value})
	}


	const handleChangeUser = val => setProject({...project, user: val})


	const handleSubmit = () => dispatch(setLoading(true))


	return (
		<div>
			<Header title="Editar proyecto" />

			<div className="page-content">
				<Form method="post" onSubmit={ handleSubmit }>
					<div className="grid grid-cols-12 gap-x-10">
						
						<div className="col-span-6">
								
							<div className="form-wrapper">
								<div>
									<Input 
										name="name"
										value={ name } 
										label="Nombre"
										onChange={ e => handleInput(e, 'name') } />
								</div>

								<div>
									<Input 
										name="team"
										value={ team } 
										label="Team"
										onChange={ e => handleInput(e, 'team') } />
								</div>

								<div>
									<Input 
										name="status"
										value={ status } 
										label="Status"
										onChange={ e => handleInput(e, 'status') } />
								</div>

								<div>
									<Input 
										name="closing_reason"
										value={ closing_reason } 
										label="Motivos de cancelación"
										onChange={ e => handleInput(e, 'closing_reasons') } />
								</div>


								<div>
									<ReactQuill 
										theme="snow" 
										name="description"
										value={ description } 
										onChange={ handleDescription } />
								</div>


								<div className="flex justify-end">
									<textarea 
										name="description" 
										value={ description }
										className="hidden" />

									{ id ? (<input type="hidden" name="updated_at" value={ today } />) : null }

									<input type="hidden" name="user" value={ user } />

									<Button text="Guardar" />
								</div>
							</div>
						</div>


						<div className="col-span-6">
							<div className="form-wrapper">

								<div>
									<Select 
										label="Cliente" 
										value={ project.user } 
										required 
										options={ users }
										onChange={ handleChangeUser } />
								</div>

							</div>
						</div>
					</div>
				</Form>


				<div className="mt-10">
					<Form action="">
						<button 
							type="button"
							onChange={() => deleteProject()}>Eliminar proyecto</button>
					</Form>
				</div>
			</div>
			
		</div>
	)
}


export { loader, action }
export default ProjectForm