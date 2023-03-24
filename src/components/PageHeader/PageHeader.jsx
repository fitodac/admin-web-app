import { useSelector } from 'react-redux'

import style from './PageHeader.module.css'

const Header = ({
	title
}) => {

	const { loading } = useSelector(state => state.app)

	let elem

	if( !loading ){
		elem = (<section className={ style.header }>
							<div className={ style.title }>{ title }</div>
						</section>)
	}

	return (<>{ elem }</>)
}


export default Header