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
		
		return data[0]

	} catch (err) {
		console.log('error', err)
		
	}
}

export default createProject