import React, { useRef, useState, useEffect } from 'react'

import Input from '../mini-components/Input'

const GenerationJSX = ({maxSystemSize, annualUsage, maxGeneration, preferredSystem}) => {
	return (
		<>
			<div className="fields">
				<Input
					title="Annual Usage"
					tip="Customers average kWh usage per year"
					ref={annualUsage}
					placeholder="3400kWh"
					className="sixteen wide field"
				/>
			</div>
			<div className="fields">
				<Input
					title="Max System Size"
					tip="Calculate the largest system size"
					ref={maxSystemSize}
					icon="chart bar"
					placeholder="4000"
					className="eight wide field"
				/>
        <Input
					title="Estimated Generation"
					tip="Enter the estimated annual generation"
					ref={maxGeneration}
					icon="lightbulb"
					placeholder="3219kWh"
					className="eight wide field"
				/>
			</div>
      <Input
					title="Preferred System Size"
					tip="Try different systme sizes"
					ref={preferredSystem}
					icon="chart line"
					placeholder="Optional"
					className="eight wide field"
				/>
		</>
	)
}

export default GenerationJSX
