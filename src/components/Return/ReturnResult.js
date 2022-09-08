import { useState } from 'react'
import swal from '@sweetalert/with-react'

import Table from '../mini-components/Table'

const ReturnResult = ({ returnResult }) => {
	let result = []
	let secondResult = []
	let phrase = ''
	const interestNames = ['No Interst', '2% Interest', 'Average Interest']
	let index = -1

	if (returnResult) {
		const percent = [0, 2.15, 4.39]
		const results = percent.map((percentRate) => {
			const quotePrice = returnResult[1] * 1
			let firstYearSave = returnResult[0] * 1
			// let unitRate = Number(returnResult[3])
			// let unitRateIncrease = []
			let totalSaving = 0
			let years = 0
			// let returnPeriod = []
			let stop = false

			let practice = []
			let total = 0
			for (let i = 0; i < 25; i++) {
				for (let v = 1; v <= 12; v++) {
					totalSaving += (firstYearSave / 12)	
					if(totalSaving >= quotePrice && !stop){
					
						years = [i,v]
						stop = true
					}
				}
			
				
				// totalSaving += firstYearSave
				// returnPeriod.push(Math.floor(totalSaving * 100) / 100)
				firstYearSave += (firstYearSave / 100) * percentRate

				// unitRateIncrease.push(Math.floor(unitRate * 10000) / 100)
				// unitRate += (unitRate / 100) * percentRate

				// if (totalSaving >= quotePrice && !stop) {
				// 	stop = true
				// 	years = i
				// }
			}
			index++

			return [
				interestNames[index],
				`${years[0]} Years ${years[1]} Month`,
				`£${Math.floor(totalSaving)}`,
			]
		})

		if (returnResult.length === 4) {
			const usage = returnResult[2]
			const unitRate = returnResult[3]
			const firstYearSave = returnResult[0]

			const annualSpend = usage * unitRate
			const contribution =
				annualSpend > firstYearSave
					? ['Contribution', annualSpend - firstYearSave]
					: ['Saving', firstYearSave - annualSpend]

			const contribute = contribution[1]
			phrase = contribution[0]

			secondResult = [
				[
					`£${Math.round(annualSpend)}`,
					`£${Math.round(annualSpend / 12)}`,
					`£${Math.round(firstYearSave)}`,
					`£${Math.round(contribute)}`,
					`£${Math.round(contribute / 12)}`,
				],
			]
		}
		result = results
	}

	const [
		annualSpend,
		monthlySpend,
		firstYearSave,
		contributeYear,
		contributeMonth,
	] = secondResult[0] || [0, 0, 0, 0, 0]

	const returnScript = () => {
		return swal(
			<div>
				<h1>A lil script!</h1>
				<p>Your estimated first year saving is {firstYearSave}.</p>
				<p>
					Based on the information you gave me, you spend {annualSpend} a year
					on electricity ({monthlySpend} a month), does that sound about right
					to you?
				</p>
				<p>
					{phrase === 'Contribution'
						? `So if we deduct those numbers from eachother it means you will be contributing ${contributeYear} a year which equates to only ${contributeMonth} a month towards your system.`
						: `So that means you will actually be saving ${contributeYear} a year.`}
				</p>
				<p>We all know energy prices are going to go up.</p>
				<p>
					But base on the Average inflation of 4.4% a year, you may see a
					payback on your investment in just {result[2][1]}.{' '}
				</p>
				<br></br>
				<p>
					After that you will be saving {firstYearSave}+ a year depending on
					where energy prices are in {result[2][1].split(' ')[0]} years time
				</p>
				<p>
					<strong>
						*Annual spend does not include standing charge as they will still
						have to pay that*
					</strong>
				</p>
				<p>
					<strong>
						{phrase === 'Contribution'
							? '*Concentrate on the monthly contribution as the yearly amount may sound a lot more*'
							: '*Concentrate on the yearly save and not the monthly saving*'}
					</strong>
				</p>
			</div>
		)
	}

	if (returnResult?.length === 4) {
		return (
			<div className="ui five column centered grid">
				<Table
					columnNames={[
						'Estimated Savings',
						'Return Rate',
						'Saving over 25 Years',
					]}
					content={result}
				/>
				<Table
					columnNames={[
						'Annual Spend on Electricity',
						'Monthly Spend on Electricity',
						'First Year Saving',
						`${phrase} annually`,
						`${phrase} monthly`,
					]}
					content={secondResult}
				/>
				<div
					onClick={() => returnScript()}
					className="ui animated fade button"
					tabIndex="0"
				>
					<div className="visible content">Open up basic script</div>
					<div className="hidden content">😊</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className="ui three column centered grid">
				<Table
					columnNames={[
						'Estimated Savings',
						'Return Rate',
						'Saving over 25 Years',
					]}
					content={result}
				/>
			</div>
		)
	}
}

export default ReturnResult
