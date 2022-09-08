import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import Button from './Button'

const Header = ({ title, onAdd, showAddTask }) => {
	const location = useLocation()

	return (
		<header className="header1">
			<h1>{title}</h1>
			{location.pathname === '/' && (
				<Button
					color={showAddTask ? '#cfcfcf' : 'rgba(24,123,197,255)'}
					text={showAddTask ? 'Close' : 'Add'}
					onClick={onAdd}
				/>
			)}
		</header>
	)
}

Header.defaultProps = { title: 'Task Tracker' }
Header.propTypes = {
	title: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'black',
//     backgroundColor: 'blue'
// }

export default Header
