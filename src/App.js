import React, { useRef, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import 'dotenv/config'
import Menu from './components/Menu'
import PitchJSX from './components/Pitch/PitchJSX'
import PitchResult from './components/Pitch/PitchResult'
import ArrayJSX from './components/Array/ArrayJSX'
import ArrayResult from './components/Array/ArrayResult'
import GenerationJSX from './components/Generation/GenerationJSX'
import GenerationResult from './components/Generation/GenerationResult'
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
import TaskTracker from './components/Task-Tracker/App'
import Updates from './components/mini-components/Updates'
import LondonResult from './components/London/LondonResults'
import LondonJSX from './components/London/LondonJSX'
import ComTracker from './components/comTrackker/ComTracker'

// require('dotenv').config()

const App = () => {
	const [pitchResult, setPitchResult] = useState(null)
	const [arrayResult, setArrayResult] = useState(null)
	const [activePanel, setActivePanel] = useState(false)
	const [tryAll, setTryAll] = useState(false)
	const [state, setState] = useState([])

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
	const arrayPitch = useRef(null)
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
	//London Calc
	const [locationResults, setLocationResults] = useState([])
	const location1 = useRef('Northampton')
	const location2 = useRef(null)
	const [loading, setLoading] = useState(true)
	const [londonCode, setLondonCode] = useState('GB')
	const [otherCode, setOtherCode] = useState('GB')

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



	const tryAllJSX = () => {
		return (
			<TryAll
				roofHeight={length.current.value}
				roofWidth={arrayWidth.current.value}
				type={type.current.value}
				angle={hip.current?.value}
				setTryAll={setTryAll}
				setArrayResult={setArrayResult}
				houseType={houseType.current.value}
				arrayPitch={arrayPitch.current.value}
			/>
		)
	}

	const panelTable = () => {
		return (
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
		)
	}

	const arrayDivider = () => {
		return (
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
						arrayPitch={arrayPitch}
					/>
				}
				results={<ArrayResult arrayResult={arrayResult || undefined} />}
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
							houseType.current.value,
							arrayPitch.current?.value
						)
					)
				}}
				click2={() =>
					width.current?.value || length.current?.value || hip.current?.value
						? setTryAll(true)
						: null
				}
				buttonType="split"
				buttonText={['Calculate', "Try 'Em All"]}
			/>
		)
	}
	const pitchCalcDivider = () => {
		return (
			<Divider
				inputs={<PitchJSX width={width} pitch={pitch} />}
				results={<PitchResult pitchResult={pitchResult} />}
				title="Calculate Pitch"
				icon="home"
				click1={() =>
					setPitchResult(
						Pitch(Number(width.current.value), Number(pitch.current.value))
					)
				}
			/>
		)
	}

	const genCalcDivider = () => {
		return (
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
					<GenerationResult generationState={generationState || undefined} />
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
		)
	}

	const returnCalcDivider = () => {
		return (
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
		)
	}

	const trueMeasureDivider = () => {
		return (
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
		)
	}
	useEffect(() => {
		userAction().then(function (result) {
			setState(result)
		})
	}, [locationResults])

	const KEY = 'NjaAddiPARHGi11q7jUDazNPpUm1igev'
	const userAction = async () => {
		setLoading(true)
		
		const response = await fetch(
			`https://www.mapquestapi.com/geocoding/v1/batch?key=${KEY}&location=${locationResults[0]}+${londonCode}&location=${locationResults[1]}+${otherCode}`
		)
		const myJson = await response.json() //extract JSON from the http response
		setLoading(false)
		return myJson
	}
	const londonDivider = () => {
		const clickFunc = () => {
			const option1 = location1.current.value
			? location1.current.value
				: 'Northampton'
			const option2 = location2.current.value
				? location2.current.value
				: 'Doncaster'
				setLocationResults([option1, option2])
			}

		return (
			<Divider
				inputs={<LondonJSX location1={location1} location2={location2} londonCode={londonCode} setLondonCode={setLondonCode} otherCode={otherCode} setOtherCode={setOtherCode} />}
				results={<LondonResult results={locationResults} geoLocation={state} loading={loading}/>}
				title="London Weighting"
				icon="map outline"
				click1={() => clickFunc()}
			/>
		)
	}

	return (
		<Router>
			<div style={{ width: '80%' }} className="ui container">
				<ModalWindow
					content={tryAll ? tryAllJSX() : null}
					active={tryAll}
					click={() => setTryAll(false)}
				/>
				<ModalWindow
					content={panelTable()}
					active={activePanel}
					click={() => setActivePanel(false)}
				/>
				<Menu routes="hi" />
				<div className="ui segment">
					<Routes>
						<Route path="/" element={<TaskTracker />} />
						<Route path="/array" element={arrayDivider()} />
						<Route path="/pitch-calc" element={pitchCalcDivider()} />
						<Route path="/gen-calc" element={genCalcDivider()} />
						<Route path="/return-calc" element={returnCalcDivider()} />
						<Route path="/true-measurement" element={trueMeasureDivider()} />
						<Route path="/updates" element={<Updates />} />
						<Route path="/london-weighting" element={londonDivider()} />
						<Route path='/commission-tracker' element={<ComTracker/>}/>
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
					</Routes>
				</div>
			</div>
		</Router>
	)
}
export default App
