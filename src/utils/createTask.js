import { supabase } from '../supabaseClient'
import validateFormData from './validateFormData'

const createTask = async form => {

	if( !form ) return
	form = validateFormData(form)

	try {

		const { data, error } = await supabase
			.from('tasks')
			.insert(form)
			.select()

		if( error ){
			console.error('createTask (error):')
			console.table(error)
			return
		}
		
		return data[0]

	} catch (err) {
		console.log('error', err)
	}
}

export default createTask