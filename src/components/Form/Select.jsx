import { useState, useEffect } from 'react'
import InputSelect from 'react-select'

import style from './Form.module.css'


const Select = (props) => {

	const [initValue, setInitValue] = useState()

	const { 
		label,
		required,
		options
	} = props


	const handleChange = e => {
		props.onChange(e.value)
	}

	console.log( options.findIndex(e => e.value === props.value) )


	return (
		<div className={ style.formgroup }>
			<label 
				className={ style.label }>
				{ label }
				{ required ? (<span className={ style['label-required']}></span>) : null }
			</label>

			<InputSelect 
				value={ options[options.findIndex(e => e.value === props.value)] }
				options={ options } 
				className={ style.select }
				onChange={ handleChange } />
		</div>
	)
}



export default Select