import Statistic from '../mini-components/Statistic'
import ResultTable from '../mini-components/ResultTable'
import QuestionHelper from '../mini-components/QuestionHelper'

const ArrayResult = ({ arrayResult }) => {
	const panelCount = arrayResult?.arrayLayout
		? arrayResult.arrayLayout.reduce((a, b) => a + b)
		: 0
	const panelType = arrayResult?.panel ? arrayResult.panel.value : 'panels'
	const distance = arrayResult?.distance ? (
		<div className="column aligned center">
			<Statistic
				value={`${Math.ceil(arrayResult?.distance * 100) / 100 || 0}m`}
				label="distance from hip"
				size="tiny"
			/>
		</div>
	) : null

	const roofH = arrayResult?.pitchCalced ? (
		<div className="column aligned center">
			<Statistic
				value={arrayResult?.pitchCalced + 'm'}
				label="Rafter Length"
				size="tiny"
			/>
		</div>
	) : null
	console.log(roofH)

	const panelDetails = `Height: ${arrayResult?.panel?.length || 0}m Width: ${
		arrayResult?.panel?.width || 0
	}m`

	const question =
		arrayResult?.spareSpaceTopBott - 0.3 > arrayResult?.panel?.width &&
		arrayResult.orien === 'portrait' ? (
			<QuestionHelper arrayResult={arrayResult} />
		) : null

	return (
		<>
			<div className="ui two column centered grid">
				<div className="column aligned center">
					<Statistic
						value={panelCount}
						label={panelType}
						size="large"
						tip={panelDetails}
						position="bottom center"
					/>
				</div>

				<div className="column aligned center">
					<Statistic
						value={arrayResult?.systemSize || 0}
						label="kWp"
						size="large"
					/>
				</div>
				<div className="column aligned center">
					<Statistic
						value={`${Math.floor(arrayResult?.spareSpaceTopBott * 100)/100 || 0}m`}
						label="bottom"
						size="tiny"
					/>
				</div>
				{roofH}
				{distance}

				{/* <button onClick={() =><Layout/>}></button> */}
				{arrayResult?.panel?.error ? (
					<div>{arrayResult.panel.error}</div>
				) : (
					<div style={{ color: 'transparent' }}>___________________</div>
				)}
				<div className="one column centered row">
					<div className="column aligned center">
						<table className="ui padded table">
							<thead>
								<tr className="center aligned">
									<th>Row</th>
									<th>Panel Count</th>
									<th>Total Panel Width</th>
									<th>Total Spare Space on Side</th>
								</tr>
							</thead>
							<tbody>
								<ResultTable arrayResult={arrayResult} />
							</tbody>
						</table>
					</div>
				</div>
				{question}
			</div>
		</>
	)
}

export default ArrayResult
