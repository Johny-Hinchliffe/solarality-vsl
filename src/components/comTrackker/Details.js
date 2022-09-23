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

	const createRows = (items) => {
		let result = []
		for (let i = 1; i <= 12; i++) {
			result.push(
				items.filter((el) => {
					return dayjs(el[el.length - 1]).format('M') == i
				})
			)
		}
		result = result.filter((el) => el.length > 0)

		result.forEach((el) => {
			el.unshift(dayjs(el[0][1]).format('MMM YY'))
		})
		return result
	}

	const all = createRows(allSold)

	const rows = all?.map((el) => {
		const saleCount = el.length - 1
		const installedCount = el.filter((e) => e.length === 3).length
		const totalMoneyForMonth = saleCount * 50 + installedCount * 50
		const month = el[0]
		el.shift()

		const sales = el.map((job) => {
			return {
				postcode: job[0],
				soldDate: job[1],
				installedDate: dayjs(job[2]).format('MMM YY') || 'N/A',
			}
		})

		return {
			month,
			saleCount,
			installedCount,
			totalMoneyForMonth: `£${totalMoneyForMonth}`,
			sales,
		}
	})

  rows.reverse()

  const totalPaid = ((left.length + right.length + right.length) - (rows[0].saleCount + rows[0].installedCount)) * 50
  const totalOwed = (left.length + (rows[0].saleCount + rows[0].installedCount)) * 50

  console.log({
    totalOwed,
    totalPaid
  })









	return (
		<>
			{/* <TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell>This Month</TableCell>
							<TableCell align="right">Calories</TableCell>
							<TableCell align="right">Fat&nbsp;(g)</TableCell>
							<TableCell align="right">Carbs&nbsp;(g)</TableCell>
							<TableCell align="right">Protein&nbsp;(g)</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</TableContainer> */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					mb: '20px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h5">Awaiting install</Typography>
					<Typography variant="h6">{left.length}</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h5">Installed</Typography>
					<Typography variant="h6">{right.length}</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h5">Total Sold</Typography>
					<Typography variant="h6">{left.length + right.length}</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h5">Owed</Typography>
					<Typography variant="h6">£{totalOwed}</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h5">Paid</Typography>
					<Typography variant="h6">£{totalPaid}</Typography>
				</Box>
			</Box>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Month</TableCell>
							<TableCell align="right">Sold</TableCell>
							<TableCell align="right">Installed </TableCell>
							<TableCell align="right">Total Commission</TableCell>
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
