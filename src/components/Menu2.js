import React, { useState, useRef } from 'react'

import Link from './Link'

const Menu = () => {
	return (
		<>
			<div className="ui pointing menu">
				{/* <Link href="/" className="item">
					Menu
				</Link> */}
				{/* <Link href="/" className="item">Updates</Link> */}
				<Link href="/array" className="item">
					Array Calc
				</Link>
				<Link href="/pitch-calc" className="item">
					Roof Pitch Calc
				</Link>
				<Link href="/gen-calc" className="item">
					Generation Calc
				</Link>
				{/* <Link href="/quote-calc" className="item">
					Quote Estimator
				</Link> */}
				<Link href="/return-calc" className="item">
					Investment Return Calc
				</Link>
				<Link href="/true-measurement" className="item">
					True Measurement
				</Link>
			</div>
		</>
	)
}

export default Menu
