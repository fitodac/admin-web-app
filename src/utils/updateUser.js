import { supabase } from '../supabaseClient'

const updateUser = async form => {
	
	try {

		const { data, error } = await supabase
			.from('users')
			.update({
				...form,
				id: Number(form.id)
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

export default updateUser