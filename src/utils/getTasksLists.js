import { supabase } from '../supabaseClient'


const getTaskLists = async project_id => {

	try {
		const { data: tasklists, error } = await supabase
			.from('tasklists')
			.select('*')
			.eq('project_id', project_id)
			.order('order')

		if( error ){
			console.error('ERROR')
			console.log('error', error)
			return
		}

		// Obtiene las tareas de cada lista de tareas
		const tasklists_ids = tasklists.map(e => e.id)

		const { data: tasks_data, error_tasks } = await supabase
			.from('tasks')
			.select('*')
			.in('list_id', tasklists_ids)
			.order('order')

		if( error_tasks ){
			console.error('ERROR')
			console.log('error_tasks', error_tasks)
			return
		}

		tasklists.forEach(e => {
			e.tasks = tasks_data.filter(t => t.list_id === e.id)
		})

		return {
			tasklists: tasklists,
			tasks: tasks_data
		}

	} catch (err) {
		console.log(err)
	}

}


export default getTaskLists