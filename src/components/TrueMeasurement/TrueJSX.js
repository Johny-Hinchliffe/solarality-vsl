import React from 'react'
import Input from '../mini-components/Input'


const TrueJSX = ({ trueLength, googleLength, measurement }) => {
	return (
		<>
			<div className="fields">
				<Input
					title="True Rafter Length"
					tip="Enter the true rafter length using the Roof Pitch Calculator"
					position="bottom center"
					ref={trueLength}
					icon="arrows alternate horizontal"
					placeholder="4.5"
					className="twelve wide field"
				/>
				<Input
					title="Google Rafter Roof Length"
					tip="On Google measure the roof space up to the ridge"
					position="bottom center"
					ref={googleLength}
					icon="google"
					placeholder="5"
					className="twelve wide field"
				/>
			</div>
			<div className="fields">
                <div className="four wide field"></div>
				<Input
					title="Measurement"
					tip="Measure the amount you want to calculate"
					position="bottom center"
					ref={measurement}
					icon="pencil alternate"
					placeholder="5"
					className="eight wide field"
				/>
                <div className="four wide field"></div>
			</div>
		</>
	)
}

export default TrueJSX
