const validateFormData = form => {
	if( !form ) return
	
	for(let i in form){
		if( 
			( 'number' === typeof form[i] && form[i] < 0 ) || 
			( 'string' === typeof form[i] && !form[i].length )
		){
			form[i] = null
		}
	}

	return form
}

export default validateFormData