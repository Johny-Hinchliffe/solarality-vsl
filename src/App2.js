import React, { useRef, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Menu from './components/Menu'

import PitchJSX from './components/Pitch/PitchJSX'
import PitchResult from './components/Pitch/PitchResult'

import ArrayJSX from './components/Array/ArrayJSX'
import ArrayResult from './components/Array/ArrayResult'

import GenerationJSX from './components/Generation/GenerationJSX'
import GenerationResult from './components/Generation/GenerationResult'

import QuoteJSX from './components/Quote/QuoteJSX'
import QuoteResult from './components/Quote/QuoteResult'

import ReturnJSX from './components/Return/ReturnJSX'
import ReturnResult from './components/Return/ReturnResult'

import TrueJSX from './components/TrueMeasurement/TrueJSX'
import TrueResult from './components/TrueMeasurement/TrueResult'

import Divider from './components/mini-components/Divider'
import Pitch from './components/calculators/Pitch'
import ArrayCalc from './components/calculators/Array'
import ModalWindow from './components/mini-components/ModalWindow'
import Table from './components/mini-components/Table'
import SolarPanels from './components/mini-components/SolarPanels'
import TryAll from './components/calculators/TryAll'
import Updates from './components/mini-components/Updates'
import TaskTracker from './components/Task-Tracker/App'

import Dashboard from './style-components/Dashboard'





const App = () => {
	const [pitchResult, setPitchResult] = useState(null)
	const [arrayResult, setArrayResult] = useState(null)

	const [activePanel, setActivePanel] = useState(false)
	const [returnScript, setReturnScript] = useState(false)

	const [tryAll, setTryAll] = useState(false)

	const [extraPanel, setExtraPanel] = useState(false)

	// Array Calc
	const pitch = useRef(null)
	const width = useRef(null)
	const length = useRef(null)
	const arrayWidth = useRef(null)
	const type = useRef('gable')
	const hip = useRef(0)
	const panel = useRef(null)
	const orien = useRef(null)
	const houseType = useRef('detached')

	//Investment Calc
	const [returnResult, setReturnResult] = useState(null)
	const firstYearSave = useRef(null)
	const quotePrice = useRef(null)
	const usage = useRef(null)
	const unitRate = useRef(null)

	//Generation calc
	const [generationState, setGenerationState] = useState([])
	const annualUsage = useRef(null)
	const maxSystemSize = useRef(null)
	const maxGeneration = useRef(null)
	const preferredSystem = useRef(null)

	//True Meas Calc
	const [trueMeasurement, setTrueMeasurement] = useState(null)
	const trueLength = useRef(null)
	const googleLength = useRef(null)
	const measurement = useRef(null)

	const panelContent = []

	SolarPanels.forEach((panel) => {
		panelContent.push([
			panel.value,
			`${panel.length}m`,
			`${panel.width}m`,
			`${panel.effic}%`,
			`${panel.warranty[1]} Years`,
			`${panel.warranty[0]} Years`,
		])
	})

	useEffect(() => {
		if (orien.current?.value) {
			orien.current.value = arrayResult?.orien || 'portrait'
			panel.current.value =
				arrayResult?.panel?.value || 'Unspecified 385W Panel'
		}
	}, [arrayResult])

	return (
		<Router>
			<div style={{ width: '80%' }} className="ui container">
				<ModalWindow
					content={
						tryAll ? (
							<TryAll
								roofHeight={length.current.value}
								roofWidth={arrayWidth.current.value}
								type={type.current.value}
								angle={hip.current?.value}
								setTryAll={setTryAll}
								setArrayResult={setArrayResult}
								houseType={houseType.current.value}
							/>
						) : null
					}
					active={tryAll}
					click={() => setTryAll(false)}
				/>
				<ModalWindow
					content={
						<Table
							content={panelContent}
							columnNames={[
								'Panel',
								'Length',
								'Width',
								'Efficiency',
								'Performance warranty',
								'Product warranty',
							]}
						/>
					}
					active={activePanel}
					click={() => setActivePanel(false)}
				/>
				<Menu routes="hi" />
				<div className="ui segment">
					<Routes>
						<Route path="/" element={<TaskTracker />} />
						<Route
							path="/array"
							element={
								<Divider
									inputs={
										<ArrayJSX
											length={length}
											width={arrayWidth}
											type={type}
											hip={hip}
											panel={panel}
											orien={orien}
											setActivePanel={setActivePanel}
											houseType={houseType}
										/>
									}
									results={
										<ArrayResult arrayResult={arrayResult || undefined} />
									}
									title="Calculate Array"
									icon="th"
									click1={() => {
										setArrayResult(
											ArrayCalc(
												length.current.value,
												arrayWidth.current.value,
												panel.current.value,
												type.current.value,
												orien.current.value,
												hip.current?.value,
												houseType.current.value
											)
										)
									}}
									click2={() =>
										width.current?.value ||
										length.current?.value ||
										hip.current?.value
											? setTryAll(true)
											: null
									}
									buttonType="split"
									buttonText={['Calculate', "Try 'Em All"]}
								/>
							}
						/>
						<Route
							path="/pitch-calc"
							element={
								<Divider
									inputs={<PitchJSX width={width} pitch={pitch} />}
									results={<PitchResult pitchResult={pitchResult} />}
									title="Calculate Pitch"
									icon="home"
									click1={() =>
										setPitchResult(
											Pitch(
												Number(width.current.value),
												Number(pitch.current.value)
											)
										)
									}
								/>
							}
						/>
						<Route
							path="/gen-calc"
							element={
								<Divider
									inputs={
										<GenerationJSX
											annualUsage={annualUsage}
											maxSystemSize={maxSystemSize}
											maxGeneration={maxGeneration}
											preferredSystem={preferredSystem}
										/>
									}
									results={
										<GenerationResult
											generationState={generationState || undefined}
										/>
									}
									title="Generation Calculator"
									icon="lightbulb outline"
									click1={() =>
										setGenerationState([
											annualUsage.current.value * 1,
											maxSystemSize.current.value * 1,
											maxGeneration.current.value * 1,
											preferredSystem.current.value * 1,
										])
									}
								/>
							}
						/>
						{/* <Route
							path="/quote-calc"
							element={
								<Divider
									inputs={<QuoteJSX />}
									results={<QuoteResult />}
									title="Quote Calculator"
									icon="calculator"
									click1={() => console.log('clicked generation')}
								/>
							}
						/> */}
						<Route
							path="/return-calc"
							element={
								<Divider
									inputs={
										<ReturnJSX
											firstYearSave={firstYearSave}
											quotePrice={quotePrice}
											usage={usage}
											unitRate={unitRate}
										/>
									}
									results={<ReturnResult returnResult={returnResult} />}
									title="Return Calculator"
									icon="pound sign"
									click1={() =>
										firstYearSave.current.value &&
										quotePrice.current.value &&
										usage.current.value &&
										unitRate.current.value
											? setReturnResult([
													firstYearSave.current.value,
													quotePrice.current.value,
													usage.current.value,
													unitRate.current.value,
											  ])
											: firstYearSave.current.value && quotePrice.current.value
											? setReturnResult([
													firstYearSave.current.value,
													quotePrice.current.value,
											  ])
											: null
									}
								/>
							}
						/>
						<Route
							path="/true-measurement"
							element={
								<Divider
									inputs={
										<TrueJSX
											trueLength={trueLength}
											googleLength={googleLength}
											measurement={measurement}
										/>
									}
									results={<TrueResult results={trueMeasurement} />}
									title="True Measurement"
									icon="sliders horizontal"
									click1={() =>
										trueLength.current.value &&
										googleLength.current.value &&
										measurement.current.value
											? setTrueMeasurement([
													trueLength.current.value,
													googleLength.current.value,
													measurement.current.value,
											  ])
											: null
									}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	)
}
export default App
