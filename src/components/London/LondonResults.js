import React from 'react'
import Table from '../mini-components/Table'
import Statistic from '../mini-components/Statistic'

const LondonResults = ({ results, geoLocation, loading }) => {
	if (loading && results.length > 0) {
		return (
			<>
				<div className="ui four column centered grid">
					<div className="column middle aligned container">
						<div className="ui center aligned container middle">
							<div className="ui active inverted dimmer">
								<div
									style={{ marginTop: '50%' }}
									className="ui large text loader"
								>
									Loading
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	if (geoLocation.length <= 0 || !geoLocation) {
		return <div></div>
	}

	if (
		geoLocation.results[0].locations[0].adminArea5 === 'União da Vitória' ||
		geoLocation.results[0].locations[0].adminArea5 === 'Anápolis'
	) {
		return <div></div>
	}

	const londonLocation = geoLocation.results[0].locations[0]
	const londonCountry = londonLocation.adminArea1
	const londonCounty = londonLocation.adminArea4
	const londonCity = londonLocation.adminArea5
	const londonLatitude = londonLocation.latLng.lat

	const otherLocation = geoLocation.results[1].locations[0]
	const otherCountry = otherLocation.adminArea1
	const otherCounty = otherLocation.adminArea4
	const otherCity = otherLocation.adminArea5
	const otherLatitude = otherLocation.latLng.lat

	const london = [londonCity, londonCounty, londonCountry]
	const other = [otherCity, otherCounty, otherCountry]

	const latDifference = (londonLatitude - otherLatitude) * 69

	const differenceResult =
		latDifference < 0
			? `${otherCity} is ${Math.round(
					latDifference * -1
			  )} miles north of ${londonCity}`
			: `${otherCity} is ${Math.round(
					latDifference
			  )} miles south of ${londonCity}`

	return (
		<>
			<div className="ui four column centered grid">
				<div className="column middle aligned container">
					<div className="ui center aligned container middle">
						<div  className="ui icon header">
							<Statistic 
								value={latDifference < 0 ? 'The North' : 'The South'}
							/>
						</div>
					</div>
				</div>
				<Table
					columnNames={['City', 'County', 'Country']}
					content={[london, other]}
				/>
				<div
					className={`ui ${
						latDifference < 0 ? 'positive' : 'negative'
					} message`}
				>
					<div className="header">{differenceResult}</div>
				</div>
			</div>
		</>
	)
}

export default LondonResults
//http://www.mapquestapi.com/geocoding/v1/batch?key=NjaAddiPARHGi11q7jUDazNPpUm1igev&location=worksop&location=northampton
