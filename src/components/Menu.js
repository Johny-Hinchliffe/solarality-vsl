import React, { useState, useRef } from 'react'

import Link from './Link'
import img from '../images/solar.png'

const Menu = () => {
	const [active, setActive] = useState('browse item')
	const [popout, setPopout] = useState('ui fluid popup')

	const enter = () => {
		setActive('browse item active')
		setPopout('ui fluid popup bottom center transition visible')
	}

	const leave = () => {
		setActive('browse item')
		setPopout('ui fluid popup')
	}

	return (
		<>
			<div className="ui top menu">
				<Link href="/updates" className="item">
					<img src={img} />
				</Link>
				<Link href="/" className="item">
					To-do
				</Link>
				<Link href="/commission-tracker" className="item">
					Commission Tracker
				</Link>
				<Link href="/array" className="item">
					Array
				</Link>
				<Link href="/pitch-calc" className="item">
					Roof Pitch
				</Link>
				<Link href="/gen-calc" className="item">
					Generation
				</Link>
				<Link href="/return-calc" className="item">
					Investment Return
				</Link>
				<Link href="/true-measurement" className="item">
					True Measurement
				</Link>
				<Link href="/london-weighting" className="item">
					London Weighting
				</Link>
			</div>
		</>
	)
}

export default Menu
