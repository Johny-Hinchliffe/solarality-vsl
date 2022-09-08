import React from 'react'
import Statistic from '../mini-components/Statistic'
import Table from '../mini-components/Table'

const TrueResults = ({ results }) => {
	if (!results) {
		return <div className=""></div>
	}

	const [trueLength, googleLength, measurement] = results
	
		const diff = trueLength / googleLength
		const result = Math.floor(diff * measurement * 100) / 100
	

	return <div className="column middle aligned container">
  <Table
				columnNames={['Actual Roof Length', 'Google Half Roof Length', 'Distance Measured']}
				content={[[trueLength+'m', googleLength+'m', measurement+'m']]}
			/>
      <br></br>
      <div className="ui center aligned container middle">
				<div className="ui icon huge header">
          ({trueLength} ÷ {googleLength}) x {measurement} = {result}m
          
        </div>
        </div>
</div>
}

export default TrueResults
