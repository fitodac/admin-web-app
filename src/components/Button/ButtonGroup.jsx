import style from './Button.module.css'
import form_style from '../Form/Form.module.css'


const ButtonGroup = (props) => {

	const {
		options,
		type,
		label,
		required,
		value,
		name
	} = props


	const handleChange = e => props.onChange(e.target.value)



	return (
		<div className={ form_style.formgroup }>
			{ label ? 
				(<label 
					className={ form_style.label }>
					{ label }
					{ required ? (<span className={ form_style['label-required']}></span>) : null }
				</label>) : 
				null}

			<div className={ style['btn-group']}>
				{ options.length > 0 ? 
					options.map((e, i) => (
						<label 
							key={ i }
							className={ style['btn-label'] }>

							<input 
								type={ type ?? 'checkbox' } 
								name={ name }
								value={ e.value }
								onChange={ handleChange }
								checked={ e.value === value } />

							<span 
								className={ `${style.btn}` }>
								{ e.label }
							</span>
						</label>
					)) : 
					null }
			</div>
		</div>
	)
}


export default ButtonGroup