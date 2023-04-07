import { useState } from 'react'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'
import style from './Form.module.css'


const Editor = props => {

	const [content, setContent] = useState(props.value)

	const {
		label,
		required,
		name
	} = props


	const handleChange = value => {
		setContent(value)
		props.onChange(value)
	}


	return (
		<div className={ style.formgroup }>
			<label 
				className={ style.label }>
				{ label }
				{ required ? (<span className={ style['label-required']}></span>) : null }
			</label>

			<ReactQuill 
				theme="snow" 
				value={ content } 
				onChange={ handleChange } />

			<textarea 
				name={ name } 
				defaultValue={ content }
				rows="2"
				className="hidden" />
		</div>
	)
}


export default Editor