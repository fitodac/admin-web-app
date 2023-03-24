import { useEffect, useState } from 'react'
import { 
	useLoaderData, 
	useActionData, 
	Form,
	redirect
} from 'react-router-dom'
import getUser from '../../utils/getUser'
import createUser from '../../utils/createUser'
import updateUser from '../../utils/updateUser'
import validate from '../../utils/validateUser'
import countryList from '../../json/countries.json'

import { useDispatch } from 'react-redux'
import { setLoading } from '../../reducers/app/appSlice'

import Header from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import Input from '../../components/Form/Input'
import Select from '../../components/Form/Select'

import style from './Users.module.css'


const loader = ({ params }) => params.id ?? null


const action = async ({ params, request }) => {
	const formData = await request.formData()
	let form = Object.fromEntries(formData)

	if( validate(form) ){
		return validate(form)
	}else{
		let user = null

		if( params.id ){
			user = await updateUser({...form, id: params.id})
		}else{
			user = await createUser(form)
		}

		return redirect(`/users/${ user.id }`)
	}
}




const UserForm = () => {

	const id = useLoaderData()
	const errors = useActionData()
	const [user, setUser] = useState({})
	const [countries, setCountries] = useState(countryList.countries.map(e => ({ value: e.code, label: e.name_es})))
	const dispatch = useDispatch()
	

	const {
		name,
		lastname,
		email,
		password,
		phone,
		company,
		address,
		location,
		country,
		tin,
		tin_name,
		website,
		currency,
		code
	} = user

	
	useEffect(() => {
		if( id ){
			dispatch(setLoading(true))
			
			const fetchData = async () => {
				const data = await getUser(id)
				setUser({...data, id})
				dispatch(setLoading(false))
			}

			const resp = fetchData()
		}
	}, [])


	const handleInput = (val, idx) => {
		const obj = {...user}
		obj[idx] = val
		setUser(obj)
		
		if( errors && errors[idx] ) errors[idx].value = null
	}

	const handleSetCountry = val => setUser({...user, country: val})


	return (
		<>
			<Header title={ id ? name : 'Nuevo usuario'} />

			<div className="page-content">
				<Form method="post">
					<div className="grid grid-cols-12 gap-x-10">

						<div className="col-span-2">
							<div className="bg-slate-900 w-full h-40 grid place-content-center rounded-lg">
								<span>Logo de cliente</span>
							</div>

							{ id ? 
							(<div className="text-slate-500 mt-3 mr-2 flex justify-end">
								<span>#{ id }</span>
							</div>) :
							null}
						</div>


						<div className="col-span-5">
							<div className="form-wrapper">
								<div className="text-slate-500 text-xs font-bold">Información comercial</div>

								<div>
									<Input 
										name="company"
										value={ company } 
										label="Empresa"
										required
										validate={ errors?.company }
										onChange={ e => handleInput(e, 'company') } />
								</div>

								<div className="fieldset-2-cols">
									<div>
										<Input 
											name="email"
											value={ email } 
											label="Email"
											required
											validate={ errors?.email }
											onChange={ e => handleInput(e, 'email') } />
									</div>

									<div>
										<Input 
											name="phone"
											value={ phone } 
											label="Teléfono"
											onChange={ e => handleInput(e, 'phone') } />
									</div>
								</div>

								<div>
									<Input 
										name="address"
										value={ address } 
										label="Dirección"
										onChange={ e => handleInput(e, 'address') } />
								</div>

								<div>
									<Input 
										name="location"
										value={ location } 
										label="Localidad"
										onChange={ e => handleInput(e, 'location') } />
								</div>


								<div>
									<Select 
										label="País"
										value={ user.country } 
										required 
										options={ countries } 
										onChange={ e => handleInput(e, 'country') } />
								</div>
							</div>



							<div className="form-wrapper mt-14">
								<div className="text-slate-500 text-xs font-bold">Información de facturación</div>

								<div className="fieldset-2-cols">
									<div>
										<Input 
											name="tin"
											value={ tin } 
											label="Tin"
											required
											validate={ errors?.tin }
											onChange={ e => handleInput(e, 'tin') } />
									</div>

									<div>
										<Input 
											name="tin_name"
											value={ tin_name } 
											label="Tin name"
											required
											validate={ errors?.tin_name }
											onChange={ e => handleInput(e, 'tin_name') } />
									</div>
								</div>

								

								<div className="fieldset-2-cols">
									<div>
										<Input 
											name="currency"
											value={ currency } 
											label="Moneda"
											required
											validate={ errors?.currency }
											onChange={ e => handleInput(e, 'currency') } />
									</div>

									<div>
										<Input 
											name="code"
											value={ code } 
											label="Código"
											required
											validate={ errors?.code }
											onChange={ e => handleInput(e, 'code') } />
									</div>
								</div>

								<div>
									<input type="hidden" name="country" value={ country } />

									<Button text="Guardar" />
								</div>

							</div>

						</div>




						<div className="col-span-5">
							<div className="form-wrapper">
								<div className="text-slate-500 text-xs font-bold">Información personal</div>

								<div className="fieldset-2-cols">
									<div>
										<Input 
											name="name"
											value={ name } 
											label="Nombre"
											required
											validate={ errors?.name }
											onChange={ e => handleInput(e, 'name') } />
									</div>

									<div>
										<Input 
											name="lastname"
											value={ lastname } 
											label="Apellido"
											required
											validate={ errors?.lastname }
											onChange={ e => handleInput(e, 'lastname') } />
									</div>
								</div>

								<div className="fieldset-2-cols">
									<div>
										<Input 
											name="password"
											value={ password } 
											label="Contraseña"
											required
											validate={ errors?.password }
											onChange={ e => handleInput(e, 'password') } />
									</div>
								</div>
							</div>


							<div className="form-wrapper mt-14">
								<div>
									<Input 
										name="website"
										value={ website } 
										label="Sitio web"
										onChange={ e => handleInput(e, 'website') } />
								</div>
							</div>
								
						</div>

					</div>
				</Form>
			</div>
		</>
	)
}

export { loader, action }
export default UserForm