import { supabase } from '../supabaseClient'

const getUser = async id => {

	try {
		const { data: user, error } = await supabase
			.from('users')
			.select('*')
			.eq('id', id)
		
		if( error ){
			console.error('ERROR')
			console.log(error)
			return
		}
		
		return user[0]
		
	} catch (err) {
		console.log(err)
	}

}

export default getUser