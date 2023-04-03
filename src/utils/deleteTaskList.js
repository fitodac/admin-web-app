import { supabase } from '../supabaseClient'

const deleteTaskList = async (id, project_id) => {

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

		const { data: tasklists, error } = await supabase
			.from('tasklists')
			.select('*')
			.eq('project_id', project_id)

		console.log('deleteTaskList', tasklists)

	} catch (err) {
		console.log('error', err)
		
	}

}


export default deleteTaskList