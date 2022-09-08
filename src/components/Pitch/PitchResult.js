import { useEffect } from 'react'
import Statistic from '../mini-components/Statistic'

const PitchResult = ({ pitchResult }) => {
	

	return (
		<div className="column middle aligned container">
			<div className="ui center aligned container middle">
				<div className="ui icon header">
					<Statistic value={`${pitchResult || 0} m`} label="Pitch Height" />
				</div>
			</div>
		</div>
	)
}

export default PitchResult
