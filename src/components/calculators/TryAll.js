import React from 'react'
import swal from 'sweetalert'

import SolarPanels from '../mini-components/SolarPanels'
import ArrayCalc from './Array'
import Table from '../mini-components/Table'

const TryAll = ({
	roofHeight,
	roofWidth,
	type,
	angle,
	setTryAll,
	setArrayResult,
	houseType,
	arrayPitch
}) => {
	let triedAll = []
	
	// SolarPanels.forEach(panel => {
	// 	if(panel.width < roofWidth || panel.width < roofHeight || panel.height < roofHeight || panel.height < roofWidth){

	// 	}
	// })
	// }

	const panels = SolarPanels.filter((panel) => {
		return (
			panel.width < roofWidth &&
			panel.width < roofHeight &&
			panel.length < roofHeight &&
			panel.length < roofWidth
		)
	})

	if(panels.length === 0){
		setTryAll(false)
		swal('Oops!', 'One or more of those panels will not fit, try manually', 'error')
	}
		 
	

	panels.forEach((panel) => {
		const port = ArrayCalc(
			roofHeight,
			roofWidth,
			panel.value,
			type,
			'portrait',
			angle,
			houseType,
			arrayPitch
		)
		const land = ArrayCalc(
			roofHeight,
			roofWidth,
			panel.value,
			type,
			'landscape',
			angle,
			houseType,
			arrayPitch
		)
		land.systemSize >= port.systemSize
			? triedAll.push(land)
			: triedAll.push(port)

	
	})

	triedAll = triedAll.sort((a, b) => b.systemSize - a.systemSize)

	const allContent = triedAll.map((panel) => {
		const onClick = () => {
			setArrayResult(
				ArrayCalc(
					roofHeight,
					roofWidth,
					panel.panel.value,
					type,
					panel.orien,
					angle,
					houseType,
					arrayPitch
				)
			)
			setTryAll(false)
		}

		return [
			panel.panel.value,
			panel.orien[0].toUpperCase() + panel.orien.slice(1),
			panel.panelCount,
			`${panel.systemSize} kWp`,
			<button onClick={() => onClick()} className="ui button small blue">
				<i className="ui arrow right icon"></i>
			</button>,
		]
	})

	return (
		<Table
			content={allContent}
			columnNames={[
				'Panel Name',
				'Orientation',
				'Panel Count',
				'System Size',
				'Try It Out',
			]}
		/>
	)
}

export default TryAll
