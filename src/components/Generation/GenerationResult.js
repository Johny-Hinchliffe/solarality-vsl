import Table from '../mini-components/Table'

const GenerationResult = ({ generationState }) => {
	const [annualUsage, maxSystemSize, maxGeneration, preferedSystem] =
		generationState

	if (
		generationState.length === 0 ||
		annualUsage === 0 ||
		maxSystemSize === 0 ||
		maxGeneration === 0
	) {
		return <div></div>
	}

	const months = {
		Jan: 0.03,
		Feb: 0.045,
		Mar: 0.088,
		April: 0.11,
		May: 0.12,
		Jun: 0.135,
		July: 0.14,
		Aug: 0.115,
		Sept: 0.09,
		Oct: 0.06,
		Nov: 0.042,
		Dec: 0.025,
	}

	const chosenSystem = preferedSystem ? preferedSystem : maxSystemSize
	const generation = preferedSystem
		? (maxGeneration / maxSystemSize) * preferedSystem
		: maxGeneration

	const roundDown = (num) => Math.floor(num * 100) / 100

	const monthlyUsage = annualUsage / 12
	const dailyUsage = annualUsage / 365
	const reqGenKW = Math.floor((monthlyUsage / 0.088) * 100) / 100
	const optimalSystem =
		Math.floor(reqGenKW / (generation / chosenSystem)) / 1000

	let results = []

	for (const month in months) {
		const monthGen = generation * months[month]
		const dayGen = monthGen / 30
		const selfSufficient = Math.round((monthGen / monthlyUsage) * 100)
		results.push([
			month,
			roundDown(dayGen) + ' kWh',
			roundDown(monthGen) + ' kWh',
			roundDown(selfSufficient) + '%',
		])
	}

	return (
		<>
			<div className="ui four column centered grid">
				<Table
					columnNames={[
						'Month Usage',
						'Day Usage',
						'Optimal System',
						'Annual Generation',
					]}
					content={
						[
							[
								`${roundDown(monthlyUsage)} kWh`,
								`${roundDown(dailyUsage)} kWh`,
								`${optimalSystem} kWp`,
								`${roundDown(generation)} kWh`,
							],
						] || null
					}
				/>
				<Table
					columnNames={['Month', 'Day Gen', 'Month Gen', 'Self Sufficiency']}
					content={results}
				/>
			</div>
		</>
	)
}

export default GenerationResult
