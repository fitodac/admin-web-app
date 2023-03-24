import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../components/Loader/Loader'
import Navbar from '../components/Navbar/Navbar'

import style from './App.module.css'


const App = () => {

	const { loading } = useSelector(state => state.app)

	return (
		<main className={ style.main_wrapper }>
			<div className={ style.navbar }>
				<Navbar />
			</div>

			<div className={ style.main }>
				{ loading ? (<Loader />): null }
				<Outlet />
			</div>
		</main>
	)
}


export default App