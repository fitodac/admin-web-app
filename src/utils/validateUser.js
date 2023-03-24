const validate = form => {

	const errors = {
		name: 		{ value: null, label: 'Nombre' },
		lastname: { value: null, label: 'Apellido' },
		email: 		{ value: null, label: 'Email' },
		password: { value: null, label: 'Contraseña' },
		company: 	{ value: null, label: 'Empresa' },
		country: 	{ value: null, label: 'País' },
		tin: 			{ value: null, label: 'Tin' },
		tin_name: { value: null, label: 'Tin name' },
		currency: { value: null, label: 'Moneda' },
		code: 		{ value: null, label: 'Código' }
	}



	for(let i in form){
		if( errors[i] ){
			if( !form[i].length ) errors[i].value = `El campo ${errors[i].label} no puede esta vacío`
			
			if( 
				'email' === i && 
				!form[i].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
			) errors[i].value = `El email debe ser válido`
			
		}
	}

	let have_errors = false
	for(let i in errors) if( errors[i].value && errors[i].value.length ) have_errors = true

	return have_errors ? errors : null
}

export default validate