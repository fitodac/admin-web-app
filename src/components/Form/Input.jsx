import style from './Form.module.css'


const Input = props => {

	const {
		label,
		name, 
		value, 
		placeholder,
		required
	} = props


	const handleChange = e => props.onChange(e.target.value)

	const input_class = [style.input]
	if( props.validate?.value ) input_class.push(style['input-error'])


	return (
		<div className={ style.formgroup }>
			<label 
				className={ style.label }>
				{ label }
				{ required ? (<span className={ style['label-required']}></span>) : null }
			</label>


			<input 
				type="text" 
				name={ name }
				defaultValue={ value }
				placeholder={ placeholder }
				className={ input_class.join(' ') }
				onChange={ handleChange } />

			{ props.validate?.value ? 
				(<div className={ style.error }>{ props.validate.value }</div>) : 
				null }
		</div>
	)
}

export default Input