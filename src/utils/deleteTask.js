import { supabase } from '../supabaseClient'

const deleteTask = async id => {

	try {
		const { delete_error } = await supabase
			.from('tasks')
			.delete()
			.eq('id', id)

		if( delete_error ){
			console.error('deleteTask (error):')
			console.table(error)
			return
		}

		return

	} catch (err) {
		console.log('error', err)
		
	}

}


export default deleteTask