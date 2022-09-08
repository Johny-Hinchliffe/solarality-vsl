import React from 'react'

const Table = ({ columnNames, content, click }) => {
	return (
		<div className="one column centered row">
			<div className="column aligned center">
				<table className="ui padded table">
					<thead>
						<tr className="center aligned">
							{columnNames.map((el) => (
								<th onClick={() => click && click()}key={el}>{el}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{content.map((panels) => (
							<tr key={Math.random() * 1000} className="center aligned">
								{panels.map((panelContent) => (
									<td key={Math.random() * 1000}>{panelContent}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Table
