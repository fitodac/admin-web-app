import { useState, useEffect } from 'react'
import { useLoaderData, Form } from 'react-router-dom'
import getUser from '../../utils/getUser'
import deleteUser from '../../utils/deleteUser'

import { useDispatch } from 'react-redux'
import { setLoading } from '../../reducers/app/appSlice'

import Header from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'


const loader = async ({ params }) => params.id


const UserProfile = () => {

	const id = useLoaderData()
	const [user, setUser] = useState({})
	const dispatch = useDispatch()

	const {
		uuid, 
		name,
		lastname,
		company,
		email,
		phone,
		website,
		address,
		location,
		country,
		tin,
		tin_name,
		currency,
		created_at
	} = user

	const fullname = `${ name } ${ lastname }`
	const d = new Date(created_at)
	const _date = d.toLocaleString('es', {
		month: 'long',
		day: '2-digit',
		year: 'numeric'
	})


	useEffect(() => {
		dispatch(setLoading(true))
		
		const fetchData = async () => {
			const data = await getUser(id)
			console.log('data', data)
			setUser(data)
			dispatch(setLoading(false))
		}

		const resp = fetchData()
	}, [])



	return (
		<>
			<Header title="Perfil de usuario" />
			
			<div className="page-content">
				<div className="grid grid-cols-12 gap-x-10">

					<div className="col-span-2">
						<div className="bg-slate-900 w-full h-40 grid place-content-center rounded-lg">
							<span>Logo de cliente</span>
						</div>
					</div>


					<div className="col-span-6">
						<div className="grid gap-y-7">
							<div>
								<div className="text-2xl">{ company }</div>
								<div className="text-xs text-slate-500">{ uuid }</div>
							</div>

							<div>
								<div className="text-lg font-bold">{ fullname }</div>
								<div className="">Email: { email }</div>
								<div className="">Tel: { phone }</div>
							</div>

							<div>
								<div className="text-slate-500 text-xs font-bold">Dirección</div>
								<div className="">{ address }</div>
								<div className="">{ `${ location }, ${ country }` }</div>
							</div>

							<div>
								<div className="">Web: { website }</div>
							</div>

							<div>
								<div className="text-slate-500 text-xs font-bold">Información de facturación</div>
								<div className="">{ `${ tin_name }: ${ tin }` }</div>
								<div className="">Moneda: { currency }</div>
							</div>

							<div>
								<div className="text-slate-500 text-xs">Registrado el { _date }</div>
							</div>
						</div>


						<div className="mt-10">
							<Button 
								text="Editar"
								to={`/users/edit/${ id }`} />
						</div>
					</div>


				</div>
			</div>
		</>
	)
}


export { loader }
export default UserProfile