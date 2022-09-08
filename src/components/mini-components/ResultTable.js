import React from 'react'

const ResultTable = ({ arrayResult }) => {
	const {
		arrayLayout,
		spareSpaceSides,
		spareSpaceTopBott,
		panel,
		distance,
		orien,
		totalPanelWidth,
		extraPanel
	} = arrayResult || 0
	
	const lastRow = arrayResult?.extraPanel ? arrayLayout?.length-1 : null

	const colour = el => el/2 < 0.2 ? 'red' : el/2 < 0.3 ? 'orange' : 'green'

	const content = []

	for (let i = 0; i < arrayLayout?.length; i++) {
		
		content.push(
			<tr key={i} className="center aligned">
				<td>Row {i + 1}</td>
				<td>
					{arrayLayout[i]} {i === lastRow ? 'landscape' : orien}
				</td>
				<td>{totalPanelWidth[i]}m</td>
				<td style={{fontWeight: '900', color: `${colour(spareSpaceSides[i])}`}}>{spareSpaceSides[i]}m</td>
			</tr>
		)
	}
	return content
}

export default ResultTable
