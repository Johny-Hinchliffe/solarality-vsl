import Panels from '../mini-components/SolarPanels'
import swal from 'sweetalert'
import pitchCalc from './Pitch'

const Array = (roofHeight, roofWidth, panelName, type, orien, angle, houseType, arrayPitch) => {
	if (roofHeight === '' || roofWidth === '') {
		const response = `You forgot the ${
			roofHeight === '' && roofWidth === ''
				? 'roof length & roof width'
				: roofHeight === ''
				? 'roof length'
				: 'roof width'
		}`
		return swal('Oops!', response, 'error')
	}
	if (type !== 'gable' && !angle) {
		return swal('Oops!', "Don't forget the hip angle", 'error')
	}

	let roofW = roofWidth
	let roofH = arrayPitch ? pitchCalc(roofHeight, arrayPitch) : roofHeight
	const pitchCalced = arrayPitch ? roofH : null

	let arrayLayout = []
	let spareSpaceSides = []
	let spareSpaceTopBott = 0
	let distance = 0

	let panel = Panels.find((el) => el.value === panelName)

	let panelHeight = (orien === 'portrait' ? panel.length : panel.width) //+ 0.02
	let panelWidth = (orien === 'portrait' ? panel.width : panel.length) //+ 0.02
	const distanceCalc = panelHeight / Math.tan((angle * Math.PI) / 180)

	const gap = houseType === 'detached' ? .6 : houseType === 'semi-detached' ? .3 : 0


	


	
	if (type === 'hip') {
		roofW /= 2
	}

	if (
		roofWidth - distanceCalc - gap < panelWidth ||
		roofHeight - 0.3 < panelHeight
	) {
		return swal('Oops!', 'You will not fit a single panel on there', 'error')
	}

	for (let i = 1; i < (roofH - 0.3) / panelHeight; i++) {
		if (type !== 'gable') {
			distance = !angle ? 0 : distanceCalc
			roofW -= distance
		}
		if (roofW - gap < panelWidth) {
			break
		}
		let panelPerRow = Math.floor((roofW - gap) / panelWidth)
		const rowSpareSpace =
			Math.floor((roofW - panelPerRow * panelWidth + 0.00) * 100) / 100

		if (type === 'hip') {
			panelPerRow *= 2
			if (rowSpareSpace * 2 > panelWidth) panelPerRow++
		}

		arrayLayout.push(panelPerRow)
		spareSpaceSides.push(rowSpareSpace)
	}

	spareSpaceTopBott =
		Math.floor((roofH - arrayLayout.length * panelHeight + 0.00) * 100) / 100

	let panelCount = arrayLayout.reduce((a, b) => a + b)
	let systemSize = (panelCount * panel.watt) / 1000
	const totalPanelWidth = arrayLayout.map(
		(el) => Math.floor((el * panelWidth - 0.00) * 100) / 100
	)
	let extraPanel = false
	if (
		spareSpaceTopBott - 0.3 > panelWidth &&
		orien === 'portrait' &&
		type === 'gable'
	) {
		extraPanel = true
		const landscapeRow = Math.floor((roofWidth - gap) / panelHeight)
		const totalWidth =
			Math.floor((landscapeRow * panelHeight - 0.00) * 100) / 100
		const landscapeSpareSpace = Math.floor((roofW - totalWidth) * 100) / 100

		panelCount += landscapeRow
		systemSize = (panelCount * panel.watt) / 1000

		spareSpaceTopBott -= panelWidth
		arrayLayout.push(landscapeRow)
		spareSpaceSides.push(landscapeSpareSpace)
		totalPanelWidth.push(totalWidth)
	}
	return {
		arrayLayout,
		totalPanelWidth,
		spareSpaceSides,
		spareSpaceTopBott,
		panel,
		distance,
		systemSize,
		panelCount,
		orien,
		extraPanel,
		pitchCalced
	}
}

export default Array
