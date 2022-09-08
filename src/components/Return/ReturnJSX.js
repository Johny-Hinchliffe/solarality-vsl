import Input from '../mini-components/Input'

const ReturnJSX = ({ firstYearSave, quotePrice, usage, unitRate }) => {
	return (
		<>
			<div className="fields">
				<Input
					title="First Year Saving"
					className="eight wide field"
					tip="Check the first year saving on their quote"
					ref={firstYearSave}
					icon="pound sign"
				/>
				<Input
					title="Quote Price"
					className="eight wide field"
					ref={quotePrice}
					icon="pound sign"
				/>
			</div>
			<div className="fields">
			<Input
					title="Estimated Annual Usage"
					className="eight wide field"
					ref={usage}
					icon="power off"
					placeholder="3400"
				/>
				<Input
					title="Unit Rate"
					className="eight wide field"
					ref={unitRate}
					placeholder="0.28"
				/>
			</div>
		</>
	)
}

export default ReturnJSX
