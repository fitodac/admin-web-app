import { supabase } from '../supabaseClient'

const deleteProject = async (id) => {
	
	try {

		const { data, error } = await supabase
			.from('projects')
			.delete()
			.eq('id', id)

		if( error ){
			console.error('deleteProject (error):')
			console.table(error)
			return
		}

		console.log('deleteProject', data)

	} catch (err) {
		console.log('error', err)
		
	}
}

export default deleteProject