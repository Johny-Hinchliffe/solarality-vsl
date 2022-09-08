import React from 'react'

const BasicTable = () => {
	return (
		<table className="ui very basic collapsing celled table">
			<thead>
				<tr>
					{}
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<h4 className="ui image header">
							<img
								src="/images/avatar2/small/lena.png"
								className="ui mini rounded image"
							/>
							<div className="content">
								Lena
								<div className="sub header">Human Resources</div>
							</div>
						</h4>
					</td>
					<td>22</td>
				</tr>
				<tr>
					<td>
						<h4 className="ui image header">
							<img
								src="/images/avatar2/small/matthew.png"
								className="ui mini rounded image"
							/>
							<div className="content">
								Matthew
								<div className="sub header">Fabric Design</div>
							</div>
						</h4>
					</td>
					<td>15</td>
				</tr>
				<tr>
					<td>
						<h4 className="ui image header">
							<img
								src="/images/avatar2/small/lindsay.png"
								className="ui mini rounded image"
							/>
							<div className="content">
								Lindsay
								<div className="sub header">Entertainment</div>
							</div>
						</h4>
					</td>
					<td>12</td>
				</tr>
				<tr>
					<td>
						<h4 className="ui image header">
							<img
								src="/images/avatar2/small/mark.png"
								className="ui mini rounded image"
							/>
							<div className="content">
								Mark
								<div className="sub header">Executive</div>
							</div>
						</h4>
					</td>
					<td>11</td>
				</tr>
			</tbody>
		</table>
	)
}

export default BasicTable
