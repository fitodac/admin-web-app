import { supabase } from '../supabaseClient'


const listUsers = async (page, select) => {

	const items_per_page = 10
	
	let range_min = 0
	let range_max = items_per_page

	if( page && page > 1 ){
		range_min = (items_per_page * page) - items_per_page
		range_max = (items_per_page * page)
	}

	try {

		const { data: users, error } = await supabase
			.from('users')
			.select(select ?? '*')
			.order('created_at', {ascending: false})
			.range(range_min, range_max)
		
		if( error ){
			console.error('ERROR')
			console.log(error)
			return
		}
		
		return users
		
	} catch (err) {
		console.log(err)
	}

}



const listUsersPagination = async () => {
	const items_per_page = 10
	let total_pag = []

	try {
		const { count, error } = await supabase
			.from('users')
			.select('*', { count: 'exact', head: true })
		
		if( error ){
			console.error('ERROR')
			console.log(error)
			return
		}

		let calc = Math.floor( count / items_per_page)
		const remainder = count % items_per_page 
		calc = remainder !== 0 ? calc + 1 : calc
		for(let i = 0; i < calc; i++) total_pag.push(i+1)
		return total_pag
		
	} catch (err) {
		console.log(err)
	}
}


export {
	listUsers,
	listUsersPagination
}