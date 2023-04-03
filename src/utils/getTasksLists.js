import { supabase } from '../supabaseClient'


const getTaskLists = async project_id => {

	try {
		const { data: tasklists, error } = await supabase
			.from('tasklists')
			.select('*')
			.eq('project_id', project_id)

		if( error ){
			console.error('ERROR')
			console.log(error)
			return
		}
		
		return tasklists

	} catch (err) {
		console.log(err)
	}

}


export default getTaskLists