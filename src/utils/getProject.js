import { supabase } from '../supabaseClient'

const getProject = async id => {

	try {
		const { data: project, error } = await supabase
			.from('projects')
			.select('*, user(id, company)')
			.eq('id', id)
		
		if( error ){
			console.error('ERROR')
			console.log(error)
			return
		}
		
		return project[0]
		
	} catch (err) {
		console.log(err)
	}

}

export default getProject