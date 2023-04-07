import { supabase } from '../supabaseClient'
import validateFormData from './validateFormData'

const updateTask = async form => {

	if( !form ) return
	form = validateFormData(form)

	try {

		const { data, error } = await supabase
			.from('tasks')
			.update({
				...form,
				id: Number(form.id)
			})
			.eq('id', form.id)
			.select()

		if( error ){
			console.error('updateTasks (error):')
			console.table(error)
			return
		}
		
		return data[0]

	} catch (err) {
		console.log('error', err)
	}

}


export default updateTask