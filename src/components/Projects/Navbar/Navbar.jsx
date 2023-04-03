import style from './Navbar.module.css'
import { Link } from 'react-router-dom'


const ProjectNavbar = () => {
	
	return (
		<div className={ style.navbar }>
			<div className={ style.nav }>
				<Link to="#">Tareas</Link>
				<Link to="#">Descripción</Link>
			</div>
		</div>)
}


export default ProjectNavbar