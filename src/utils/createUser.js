import { supabase } from '../supabaseClient'

const createUser = async form => {
	
	for(let i in form) if( !form[i].length ) form[i] = null
	
	try {

		const { data, error } = await supabase
			.from('users')
			.insert(form)
			.select()

		if( error ){
			console.error('createUser (error):')
			console.table(error)
			return
		}
		
		return data[0]

	} catch (err) {
		console.log('error', err)
		
	}
}

export default createUser