import { supabase } from '../supabaseClient'

const createProject = async form => {

	for(let i in form) if( !form[i].length ) form[i] = null
	
	try {

		const { data, error } = await supabase
			.from('projects')
			.insert(form)
			.select()

		if( error ){
			console.error('createProject (error):')
			console.table(error)
			return
		}

		const project_id = data[0].id

		const { data_tasklist_toDo, error_tasklist_toDo } = await supabase
			.from('tasklists')
			.insert({ name: 'Pendiente', project_id, order: 0 })

		if( error_tasklist_toDo ){
			console.error('error_tasklist_toDo (error):')
			console.table(error)
			return
		}
		
		const { data_tasklist_inProgress, error_tasklist_inProgress } = await supabase
			.from('tasklists')
			.insert({ name: 'En curso', project_id, order: 1 })

		if( error_tasklist_inProgress ){
			console.error('error_tasklist_inProgress (error):')
			console.table(error)
			return
		}
		
		const { data_tasklist_pendingRevision, error_tasklist_pendingRevision } = await supabase
			.from('tasklists')
			.insert({ name: 'Para revisión', project_id, order: 2 })

		if( error_tasklist_pendingRevision ){
			console.error('error_tasklist_pendingRevision (error):')
			console.table(error)
			return
		}
		
		const { data_tasklist_done, error_tasklist_done } = await supabase
			.from('tasklists')
			.insert({ name: 'Hecho', project_id, order: 3 })
		
		if( error_tasklist_done ){
			console.error('error_tasklist_done (error):')
			console.table(error)
			return
		}

		return data[0]

	} catch (err) {
		console.log('error', err)
		
	}
}

export default createProject