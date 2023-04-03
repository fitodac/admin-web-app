import { supabase } from '../supabaseClient'

const deleteUser = async id => {
	
	try {

		const { data, error } = await supabase
			.from('users')
			.delete()
			.eq('id', id)

		if( error ){
			console.error('deleteUser (error):')
			console.table(error)
			return
		}

		console.log('deleteUser', data)

	} catch (err) {
		console.log('error', err)
		
	}
}

export default deleteUser