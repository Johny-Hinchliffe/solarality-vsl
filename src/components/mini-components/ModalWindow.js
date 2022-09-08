import React from 'react'

const ModalWindow = ({ header, content, active, click }) => {
	return (
		<div style={{boxShadow:'5px, 5px'}} className={active ? 'ui modal active' : 'ui modal'}>
			<div className="header">
				All Panels
				<button onClick={() => click()}
					style={{
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						boxShadow: 'none',
						cursor: 'pointer'
					}}
					className="ui right floated segment tiny"
				>
					<i className="ui window close outline icon big"></i>
				</button>
			</div>
			<div className="scrolling content">{content}</div>
		</div>
	)
}

export default ModalWindow
