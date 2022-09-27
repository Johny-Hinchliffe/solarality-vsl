import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import dayjs from 'dayjs'

import DialogBox from '../mini-components/DialogBox'
function Row(props) {
	const { row } = props
	const [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.month}
				</TableCell>
				<TableCell align="right">{row.totalSaleAmount}</TableCell>
				<TableCell align="right">{row.saleCount}</TableCell>
				<TableCell align="right">{row.installedCount}</TableCell>
				<TableCell align="right">{row.totalMoneyForMonth}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Sales
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Postcode</TableCell>
										<TableCell align="right">Sold Date</TableCell>
										<TableCell align="right">Installed Date</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.sales.map((salesRow) => (
										<TableRow key={salesRow.soldDate}>
											<TableCell component="th" scope="row">
												{salesRow.postcode}
											</TableCell>
											<TableCell align="right">{salesRow.soldDate}</TableCell>
											<TableCell align="right">
												{salesRow.installedDate}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

Row.propTypes = {
	row: PropTypes.shape({
		saleCount: PropTypes.number.isRequired,
		totalSaleAmount: PropTypes.string.isRequired,
		totalMoneyForMonth: PropTypes.string.isRequired,
		installedCount: PropTypes.number.isRequired,
		sales: PropTypes.arrayOf(
			PropTypes.shape({
				installedDate: PropTypes.string.isRequired,
				postcode: PropTypes.string.isRequired,
				soldDate: PropTypes.string,
			})
		).isRequired,
		month: PropTypes.string.isRequired,
	}).isRequired,
}

export default function CollapsibleTable({ left, right }) {
	//console.log(left, right)

	const allSold = left.concat(right)
	//console.log(allSold)

	const createRows = (items, type) => {
		let result = []
		for (let i = 1; i <= 12; i++) {
			result.push(
				items.filter((el) => {
					return dayjs(type === 2 ? el[el.length - 1] : el[2]).format('M') == i
				})
			)
		}
		result = result.filter((el) => el.length > 0)

		result.forEach((el) => {
			el.unshift(dayjs(el[0][2]).format('MMM YY'))
		})
		return result
	}

	const all = createRows(allSold, 1)

	//console.log(all)

	const rows = all?.map((el) => {
		const saleCount = el.length - 1
		const month = el[0]
		const installedCount = right.filter(
			(e) => dayjs(e[3]).format('MMM YY') === month
		).length
		const totalMoneyForMonth = saleCount * 50 + installedCount * 50

		el.shift()

		const sales = el.map((job) => {
			return {
				postcode: job[1],
				soldDate: dayjs(job[2]).format('DD/MM/YY'),
				installedDate: job[3] ? dayjs(job[3]).format('MMM YY') : 'N/A',
			}
		})

		const totalSaleAmount = `£${el
			.map((e) => Number(e[0]))
			.reduce((a, b) => a + b)}`

		console.log({
			month,
			totalSaleAmount,
			saleCount,
			installedCount,
			totalMoneyForMonth: `£${totalMoneyForMonth}`,
			sales,
		})
		//console.log(allSold.forEach(el => console.log(el)))
		//console.log(all)

		return {
			month,
			saleCount,
			installedCount,
			totalMoneyForMonth: `£${totalMoneyForMonth}`,
			totalSaleAmount,
			sales,
		}
	})

	rows.reverse()

	console.log(rows)

	//Bonus count
	const totalPaid =
		(left.length +
			right.length +
			right.length -
			(rows[0]?.saleCount + rows[0]?.installedCount)) *
		50 || 0
	const totalOwed =
		(left.length + (rows[0]?.saleCount + rows[0]?.installedCount)) * 50 || 0

	const totalBonus = totalPaid + totalOwed || 0

	//Quote Prices
	const allJobPrices = allSold.map((el) => Number(el[0]))
	const totalSaleAmount =
		allJobPrices.length > 0
			? allJobPrices.reduce((sum, row) => {
					return sum + row
			  })
			: 0
	const averageSale = Math.round(totalSaleAmount / allJobPrices.length)
	const highestSale = allJobPrices.sort((a, b) => b - a)[0]
	const lowestSale = allJobPrices.sort((a, b) => a - b)[0]

	//Job Count
	const installedCount = right.length
	const awaitingInstallCount = left.length
	const totalSold = installedCount + awaitingInstallCount

	function numCom(x) {
		if (x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		}
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					mb: '20px',
				}}
			>
				<DialogBox
					title={'Total Sold'}
					amount={totalSold}
					info={[
						['Total installed', installedCount],
						['Awaiting install', awaitingInstallCount],
					]}
				/>
				<DialogBox
					title={'Total Sale'}
					amount={`£${numCom(totalSaleAmount)}`}
					info={[
						['Average Sale', `£${numCom(averageSale)}`],
						['Highest Sale', `£${numCom(highestSale)}`],
						['Lowest Sale', `£${numCom(lowestSale)}`],
					]}
				/>
				<DialogBox
					title={'Total Bonus'}
					amount={`£${numCom(totalBonus)}`}
					info={[
						['Owed', `£${numCom(totalOwed)}`],
						['Paid', `£${numCom(totalPaid)}`],
					]}
				/>
			</Box>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Month</TableCell>
							<TableCell align="right">Sales Total</TableCell>
							<TableCell align="right">Sold</TableCell>
							<TableCell align="right">Installed </TableCell>
							<TableCell align="right">Paid</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<Row key={row.month} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
