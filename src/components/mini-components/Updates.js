import React from 'react'
import image from '../../images/detached-semi.png'

const Updates = () => {
	return (
		<div>
			<div className="column">
				<div className="ui center aligned container">
					<div className="ui icon header">
						<i className={`sync alternate icon`}></i>
						Updates
					</div>
				</div>
			</div>
			<div className="ui relaxed divided list">
				<div className="item">
					<i className="large th icon"></i>
					<div className="content">
						<a className="header" href="/london-weighting">
							London Weighting
						</a>
						<br></br>
						<div className="description">
							<strong>Overview</strong>
							<br></br>
							This new tool will tell you how far north the location is compared to Northampton
							<br></br>
							<br></br>
							<strong>New Feature</strong>
							<br></br>- If you leave the first input blank it will default to Northampton.
							<br></br>- If you leabve the second input blank it will default to Doncaster.
							<br></br>- Simples
							

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Updates
