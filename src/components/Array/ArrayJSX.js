import React, { useRef, useState, useEffect } from 'react'

import SolarPanels from '../mini-components/SolarPanels'
import Input from '../mini-components/Input'
import InputSelect from '../mini-components/InputSelect'
import Error from '../mini-components/Error'

const ArrayJSX = ({
	length,
	width,
	type,
	hip,
	panel,
	orien,
	setActivePanel,
	houseType,
	arrayPitch,
}) => {
	const [hipRoof, setHipRoof] = useState('gable')
	const [addPitch, setAddPitch] = useState(false)

	return (
		<>
			<div className="fields">
				<InputSelect
					title="Solar Panels"
					tip="All panels are different sizes"
					position="bottom center"
					values={SolarPanels}
					className="fifteen wide field"
					ref={panel}
				/>
				<div className="one wide field">
					<label
						style={{
							color: 'transparent',
						}}
					>
						lable
					</label>
					<div className="ui left icon input">
						<button
							onClick={() => {
								setActivePanel(true)
							}}
							className="circular ui icon button"
						>
							<i className="icon file alternate outline"></i>
						</button>
					</div>
				</div>
			</div>
			<div className="fields">
				<Input
					title="Roof Length"
					tip="Meausre the width of the house, not the rafter length"
					position="bottom center"
					ref={width}
					icon="arrows alternate horizontal"
					placeholder="5"
					className="twelve wide field"
				/>
				<Input
					title="Roof Width"
					tip="Measure the width of the building with the ridge in the middle"
					position="bottom center"
					ref={length}
					icon="arrows alternate vertical"
					placeholder="6"
					className="twelve wide field"
				/>
			</div>
			<div className="fields">
				<InputSelect
					title="Roof Type"
					tip="Google roof types if unsure"
					position="bottom center"
					ref={type}
					values={[
						{ value: 'gable', fullName: 'Gable Roof' },
						{ value: 'half-hip', fullName: 'Half Hip Roof' },
						{ value: 'hip', fullName: 'Hip Roof' },
					]}
					className="eight wide field"
					refChange={() => setHipRoof(type.current.value)}
				/>
				{hipRoof !== 'gable' ? (
					<Input
						title="Hip Angle"
						tip="Measure the angle of the hip not the pitch"
						position="bottom center"
						icon="home"
						className="eight wide field"
						placeholder="45"
						ref={hip}
					/>
				) : null}
			</div>
			<div className="fields">
				<InputSelect
					title="House Type"
					tip="Is the house detached, semi-detached or a townhouse"
					position="bottom center"
					ref={houseType}
					className="eight wide field"
					values={[
						{ value: 'detached', fullName: 'Detached' },
						{ value: 'semi-detached', fullName: 'Semi-Detached' },
						{ value: 'townhouse', fullName: 'Townhouse' },
					]}
				/>
				<InputSelect
					title="Panel Orientation"
					tip="Try out both options to see which fits best"
					position="bottom center"
					ref={orien}
					className="eight wide field"
					values={[
						{ value: 'portrait', fullName: 'Portrait' },
						{ value: 'landscape', fullName: 'Landscape' },
					]}
				/>
			</div>
			<div className="fields">
				<Input title='Roof Pitch' tip='In rafter length enter the whole roof measurement and it will - .3 in the background and calculate the rafter length' position='bottom left' ref={arrayPitch} placeholder='Optional' className="eight wide field" />
			</div>
		</>
	)
}

export default ArrayJSX
