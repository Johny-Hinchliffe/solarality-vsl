import { forwardRef } from 'react'

const Input = forwardRef(({ title, tip, icon, placeholder, className, position, type}, ref) => {


	return (
		<div className={className ? className : "field"} >
			<label>
				{title}
				<button
					style={{
						backgroundColor: 'transparent',
						borderColor: 'transparent',
					}}
					data-tooltip={tip}
					data-position={position || "bottom center"}
				>
					<i className={tip ? "info circle icon" : ''}></i>
				</button>
			</label>
			<div className="ui left icon input">
				<input ref={ref} type={type ? type : 'number' } placeholder={placeholder}  />
				<i className={`${icon} icon`}></i>
			</div>
		</div>
	)
})

export default Input

