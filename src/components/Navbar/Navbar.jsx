import { Link } from 'react-router-dom'

import style from './Navbar.module.css'


const Navbar = () => {
	return (
		<div className={ style.navbar }>
			<div className={ style.brand }>fitodac</div>

			<ul>
				<li>
					<Link to={'/'}>Dashboard</Link>
				</li>

				<li>
					<Link to={'/projects'}>Proyectos</Link>

					{/* <ul>
						<li>
							<Link to={'/projects/add'}>Nuevo</Link>
						</li>
					</ul> */}
				</li>

				<li>
					<Link to={'/users'}>Clientes</Link>
				</li>
			</ul>
		</div>
	)
}

export default Navbar