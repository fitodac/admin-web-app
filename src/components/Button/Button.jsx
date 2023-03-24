import { Link } from 'react-router-dom'

import style from './Button.module.css'

const Button = (props) => {

	const {
		text,
		size, // smal, large
		to
	} = props

	const button_class = [ style.btn ]
	if( size ) button_class.push(style[size])

	const handleClick = () => {
		if( props.action ) props.action()
	}

	return (
		<>
		{ to ? 
			(<Link 
				className={ button_class.join(' ') }
				to={to}>
				{ text }
			</Link>): 
			(<button 
				className={ button_class.join(' ') }
				onClick={ handleClick }>
				{ text }
			</button>)
		}
		</>
		
	)
}

export default Button