import React from 'react'

const Button = ({ click }) => {
	return (
		<div
			onClick={() => click()}
			className="field ui blue submit button sixteen wide column"
		>
			Calculate
		</div>
	)
}

export default Button
