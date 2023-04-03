import { supabase } from '../supabaseClient'
import validateFormData from './validateFormData'

const updateTasksLists = async form => {

	if( !form ) return
	form = validateFormData(form)

	try {

		const { data, error } = await supabase
			.from('tasklists')
			.update({
				...form,
				id: Number(form.id)
			})
			.eq('id', form.id)
			.select()

		if( error ){
			console.error('updateTasksLists (error):')
			console.table(error)
			return
		}
		
		return data[0]

	} catch (err) {
		console.log('error', err)
	}

}


export default updateTasksLists