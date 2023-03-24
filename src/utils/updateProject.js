import { supabase } from '../supabaseClient'

const updateProject = async (form) => {
	
	try {

		const { data, error } = await supabase
			.from('projects')
			.update({
				...form,
				id: Number(form.id),
				user: Number(form.user) || null
			})
			.eq('id', form.id)
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

export default updateProject