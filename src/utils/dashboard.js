import { supabase } from '../supabaseClient'


const getTotalRecords = async table => {
	try {
		const { count, error } = await supabase
			.from(table)
			.select('*', { count: 'exact', head: true })
		
		if( error ){
			console.error('ERROR')
			console.log(error)
			return
		}

		return count
		
	} catch (err) {
		console.log(err)
	}

}




export {
	getTotalRecords
}