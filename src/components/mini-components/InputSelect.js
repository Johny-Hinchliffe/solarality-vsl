import { forwardRef } from 'react'

const InputSelect = forwardRef(
	({ title, tip, values, className, refChange, position}, ref) => {
		return (
			<div className={className ? className : 'field'}>
				<label>
					{title}
					<button
						style={{
							backgroundColor: 'transparent',
							borderColor: 'transparent',
						}}
						data-tooltip={tip}
						data-position={position}
					>
						<i className={tip ? "info circle icon" : ''}></i>
					</button>
				</label>
				<div className="ui left icon input">
					<select className="ui dropdown" ref={ref} onChange={() => (refChange ? refChange() : null)}>
						{values.map((el) => {
							return (
								<option key={el.value} value={el.value}>
									{el.fullName}
								</option>
							)
						})}
					</select>
						
				</div>
			</div>
		)
	}
)

export default InputSelect
