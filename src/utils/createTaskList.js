import { supabase } from '../supabaseClient'
import validateFormData from './validateFormData'

const createTaskList = async form => {

	if( !form ) return
	form = validateFormData(form)

	try {

		const { data, error } = await supabase
			.from('tasklists')
			.insert(form)
			.select()

		if( error ){
			console.error('createTaskList (error):')
			console.table(error)
			return
		}
		
		console.log(data)
		return data[0]

	} catch (err) {
		console.log('error', err)
		
	}
}

export default createTaskList