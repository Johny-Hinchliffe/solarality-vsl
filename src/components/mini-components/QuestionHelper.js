import React from 'react'

const QuestionHelper = ({arrayResult}) => {

	return (
		<h5 className="ui icon header">
			<i className="question circle outline icon"></i>
			<div className="content">
				Add Extra Panels?
				<div className="sub header">
					Leaving a 30cm gap at the bottom, you will still have {Math.floor((arrayResult.spareSpaceTopBott -.3) * 100)/100}m of leftover space on so you might be able to
					fit a row in {arrayResult.orien === 'portrait' ? 'landscape' : 'portrait'}
				</div>
			</div>
		</h5>
	)
}

export default QuestionHelper
