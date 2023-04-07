import { useState, useRef } from 'react'
import style from './Form.module.css'


const InputNumber = (props) => {

	const {
		label,
		name, 
		required,
		only_change_with_buttons
	} = props

	const [value, setValue] = useState(props.value)
	const el = useRef(null)


	const handleChange = e => {
		let val = Number(e.target.value)
		if( val <= 0 || val === '' ) val = 0
		setValue(val)
		props.onChange(e.target.value)
	}
	
	const handlePlus = () => {
		const val = value + 1
		props.onChange(val)
		setValue(val)
		setTimeout(() => {value}, 2000)
	}
	
	const handleMin = () => {
		if( value <= 0 ) return
		const val = value - 1
		setValue(val)
		props.onChange(val)
	}

	const input_class = [style['input-number']]
	if( props.validate?.value ) input_class.push(style['input-error'])



	return (
		<div className={ style.formgroup }>
			<label 
				className={ style.label }>
				{ label }
				{ required ? (<span className={ style['label-required']}></span>) : null }
			</label>


			<div className={ style['input-number-wrapper'] }>
				<button 
					type="button"
					onClick={ handleMin }>
					<span className="m-auto text-2xl font-thin">−</span>
				</button>
			
				<input 
					type="number" 
					ref={ el }
					className={ input_class.join(' ') }
					name={ name }
					value={ value }
					min="0"
					autoComplete="false"
					onChange={ handleChange }
					readOnly={ only_change_with_buttons } />
			
				<button 
					type="button"
					onClick={ handlePlus }>
					<span className="m-auto text-2xl font-thin">+</span>
				</button>
			</div>


			{ props.validate?.value ? 
				(<div className={ style.error }>{ props.validate.value }</div>) : 
				null }
		</div>
	)
}


export default InputNumber