import { supabase } from '../supabaseClient'

const deleteTaskList = async id => {

	try {
		const { delete_error } = await supabase
			.from('tasklists')
			.delete()
			.eq('id', id)

		if( delete_error ){
			console.error('deleteTaskList (error):')
			console.table(error)
			return
		}

		return

	} catch (err) {
		console.log('error', err)
		
	}

}


export default deleteTaskList