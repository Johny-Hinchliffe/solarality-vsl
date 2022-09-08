import { useState, useEffect, useRef, forwardRef } from 'react'
import Input from '../mini-components/Input'
import InputSelect from '../mini-components/InputSelect'
import data from './london-data'

const Country = forwardRef(
	(
		{ title, tip, position, placeholder, icon, state, setState, onInputChange },
		reference
	) => {
		return (
			<div className="eight wide field">
				<label>
					{title}
					<button
						style={{
							backgroundColor: 'transparent',
							borderColor: 'transparent',
						}}
						data-tooltip={tip}
						data-position={position || 'bottom center'}
					>
						<i className={tip ? 'info circle icon' : ''}></i>
					</button>
				</label>
				<input
					ref={reference}
					list="countries"
					placeholder={placeholder}
					onInput={() => onInputChange(reference.current.value, setState)}
					value={state}
				/>
				<datalist id="countries">
					{data.map((el) => {
						return (
							<option key={el.id} value={el.alpha2.toUpperCase()}>
								{el.en}
							</option>
						)
					})}
				</datalist>
			</div>
		)
	}
)

const LondonJSX = ({
	location1,
	location2,
	londonCode,
	setLondonCode,
	otherCode,
	setOtherCode,
}) => {
	const londonRef = useRef('GB')
	const otherRef = useRef('GB')
	const [changeCountry, setChangeCountry] = useState(false)

	const onChange = (ref, setCodeState) => {
		setCodeState(ref)
	}

	return (
		<>
			<div className="ui fields">
				<Input
					title="London Borderline"
					ref={location1}
					icon="arrow down"
					placeholder="Northampton"
					className="eight wide field"
					type="text"
					value="Northampton"
				/>
				{changeCountry ? (
					<Country
						title="Country"
						placeholder="GB"
						state={londonCode}
						setState={setLondonCode}
						onInputChange={onChange}
						ref={londonRef}
					/>
				) : null}
			</div>
			<div className="ui fields">
				<Input
					title="House Location"
					tip=""
					ref={location2}
					icon="arrow up"
					placeholder="City Name"
					className="eight wide field"
					type="text"
				/>
				{changeCountry ? (
					<Country
						title="Country"
						placeholder="GB"
						icon=""
						state={otherCode}
						setState={setOtherCode}
						onInputChange={onChange}
						ref={otherRef}
					/>
				) : null}
			</div>
			<div className="ui fields">
				<div className="ui toggle checkbox">
					<input
						checked={changeCountry}
						onChange={() => setChangeCountry(!changeCountry)}
						type="checkbox"
						name="change country"
					/>
					<label>Change Country</label>
				</div>
			</div>
		</>
	)
}

export default LondonJSX
