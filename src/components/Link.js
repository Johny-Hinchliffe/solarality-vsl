import React, { useState, useRef, useEffect, forwardRef } from 'react'

const Link = ({ href, className, children }) => {
	const ref = useRef(null)

	const onClick = (event) => {
		if (event.metaKey || event.ctrlKey) {
			return
		}
		event.preventDefault()
		window.history.pushState({}, '', href)
		const navEvent = new PopStateEvent('popstate')
		window.dispatchEvent(navEvent)
	}
	return (
		<a ref={ref} onClick={onClick} href={href} className={className}>
			{children}
		</a>
	)
}

export default Link
