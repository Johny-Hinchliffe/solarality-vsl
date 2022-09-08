import React, { useRef, useState, useEffect } from 'react'

import Pitch from '../calculators/Pitch'
import Input from '../mini-components/Input'

const PitchJSX = ({ pitch, width }) => {
	return (
		<div className="ui fields">
			<Input
				title="Pitch"
				tip="Underestimate if you are uncertain"
				ref={pitch}
				icon="external square alternate"
				placeholder="45"
				className="eight wide field"
			/>
			<Input
				title="House Width"
				tip="Horizontal distance with the roof ridge in the middle"
				ref={width}
				icon="arrows alternate horizontal"
				placeholder="10"
				className="eight wide field"
			/>
		</div>
	)
}

export default PitchJSX
