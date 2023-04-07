import { useLoaderData, Link } from 'react-router-dom'

import Header from '../../components/PageHeader/PageHeader'

import style from './Projects.module.css'


const loader = async ({ params }) => params.id


const action = async ({ request }) => {
	const formData = await request.formData()
	const form = Object.fromEntries(formData)
	deleteProject(form.id)
	
	return null
}




const Project = props => {

	const id = useLoaderData()

	return (
		<>
			<Header title="Proyecto"/>

			<div className={ style.navbar }>
				<div className={ style.nav }>
					<Link to={ `/projects/${id}` }>Tareas</Link>
					<Link to={ `/projects/${id}/settings` }>Configuración</Link>
				</div>
			</div>

			<div className="page-content">{ props.children }</div>
		</>
	)
}


export { loader }
export default Project