import React from 'react'
import Button from './Button'
import ButtonSplit from './ButtonSplit'

const Divider = ({
	inputs,
	results,
	title,
	icon,
	click1,
	click2,
	buttonText,
	buttonType,
}) => {
	return (
		<div className="ui segment">
			<div className="ui two column very relaxed stackable grid">
				<div className="column">
					<div className="ui center aligned container">
						<div className="ui icon header">
							<i className={`${icon} icon`}></i>
							{title}
						</div>
					</div>
					<div className="ui form">
						{inputs}
						{buttonType === 'split' ? (
							<ButtonSplit
								option1={buttonText[0]}
								option2={buttonText[1]}
								click1={click1}
								click2={click2}
							/>
						) : (
							<Button click={click1} />
						)}
					</div>
				</div>
				{results}
			</div>
			<div className="ui vertical divider">
				<i
					style={{ fontSize: '30px' }}
					className="hand point right outline icon"
				></i>
			</div>
		</div>
	)
}

export default Divider
