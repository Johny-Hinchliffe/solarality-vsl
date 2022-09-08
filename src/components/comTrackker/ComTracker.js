import * as React from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Typography, TextField, CardContent } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import Modal from '../mini-components/Modal'
import DeleteBin from './DeleteBin'

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1)
}

function union(a, b) {
	return [...a, ...not(b, a)]
}

export default function ComTracker() {
	const [checked, setChecked] = React.useState([])
	const [left, setLeft] = React.useState([])
	const [right, setRight] = React.useState([])
	const [sortBy, setSortBy] = React.useState('Postcode')
	const [date, setDate] = React.useState(new Date())
	const [postcode, setPostcode] = React.useState()
	const [error, setError] = React.useState(false)

	const leftChecked = intersection(checked, left)
	const rightChecked = intersection(checked, right)
	const [deleted, setDeleted] = React.useState([])
	const LEFT_KEY = 'plAhYreDf322£$'
	const RIGHT_KEY = 'djfDK59£94LlP'
	const DELETED_KEY = 'qwwdDF£!46PA'

	React.useEffect(() => {
		const getLeft = async () => {
			const leftItems = JSON.parse(localStorage.getItem(LEFT_KEY))
			setLeft(leftItems ? leftItems : [])
		}
		const getRight = async () => {
			const rightItems = JSON.parse(localStorage.getItem(RIGHT_KEY))
			setRight(rightItems ? rightItems : [])
		}
		const getDeleted = async () => {
			const deletedItems = JSON.parse(localStorage.getItem(DELETED_KEY))
			setDeleted(deletedItems ? deletedItems : [])
		}
		getDeleted()
		getLeft()
		getRight()
		setChecked([])
	}, [])

	React.useEffect(() => {
		localStorage.setItem(LEFT_KEY, JSON.stringify(left))
		localStorage.setItem(RIGHT_KEY, JSON.stringify(right))
		localStorage.setItem(DELETED_KEY, JSON.stringify(deleted))
		setChecked([])

		if (sortBy === 'Post') {
			setLeft(left.sort())
			setRight(right.sort())
		}

		if (sortBy === 'Date') {
			setLeft(left.sort((a, b) => a[1].localeCompare(b[1])))
			setRight(right.sort((a, b) => a[1].localeCompare(b[1])))
		}
	}, [left, right, deleted])

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]

		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		setChecked(newChecked)
	}

	const numberOfChecked = (items) => intersection(checked, items).length

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items))
		} else {
			setChecked(union(checked, items))
		}
	}

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked))

		//setDeleted(not(deleted, leftChecked))
		setLeft(not(left, leftChecked))
		setChecked(not(checked, leftChecked))
	}

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked))

		setRight(not(right, rightChecked))
		setChecked(not(checked, rightChecked))
	}

	const handleOrder = () => {
		const sort = sortBy === 'Post' ? 'Date' : 'Post'
		setChecked([])
		if (sort === 'Post') {
			setLeft(left.sort())
			setRight(right.sort())
		} else {
			setLeft(left.sort((a, b) => a[1].localeCompare(b[1])))
			setRight(right.sort((a, b) => a[1].localeCompare(b[1])))
		}
		setSortBy(sort)
	}

	const handleSubmit = (event) => {
		if (!postcode) {
			setError(true)
		} else {
			setError(false)
			setLeft([
				...left,
				[postcode.toUpperCase(), dayjs(date).format('YYYY/MM/DD')],
			])
		}
	}

	const handleDelete = () => {
		setDeleted(deleted.concat(rightChecked).sort())
		setDeleted(deleted.concat(leftChecked).sort())
		setRight(not(right, rightChecked))
		setLeft(not(left, leftChecked))
		setChecked(not(checked, leftChecked))
		setChecked(not(checked, rightChecked))
	}

	const owed = `Total Owed £${!left ? 0 : left.length * 100}`
	const paid = `Total Paid £${!right ? 0 : right.length * 100}`
	const recover = (
		<>
			<RestoreFromTrashIcon /> Recover
		</>
	)

	const buttonOption = () => {
		if (leftChecked.length > 0) {
			return (
				<Button
					variant="contained"
					size="small"
					onClick={handleDelete}
					disabled={leftChecked.length === 0}
					aria-label="move selected left"
					color="error"
				>
					<DeleteIcon /> Delete
				</Button>
			)
		} else {
			return (
				<Modal
					rightChecked={rightChecked}
					leftChecked={leftChecked}
					button={recover}
					title={'Lost Jobs'}
					content={
						<DeleteBin
							deleted={deleted}
							setDeleted={setDeleted}
							left={left}
							setLeft={setLeft}
							not={not}
						/>
					}
				/>
			)
		}
	}

	const customList = (title, items, subheading) => (
		<Card>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<CardHeader
					sx={{ px: 2, py: 1 }}
					avatar={
						<Checkbox
							onClick={handleToggleAll(items)}
							checked={
								numberOfChecked(items) === items.length && items.length !== 0
							}
							indeterminate={
								numberOfChecked(items) !== items.length &&
								numberOfChecked(items) !== 0
							}
							disabled={items.length === 0}
							inputProps={{
								'aria-label': 'all items selected',
							}}
						/>
					}
					title={title}
					subheader={`${numberOfChecked(items)}/${items.length} selected`}
				/>

				<Typography variant="subtitle1" sx={{ marginRight: '10px' }}>
					{subheading}
				</Typography>
			</Box>
			<Divider />
			<List
				sx={{
					width: 300,
					height: 460,
					bgcolor: 'background.paper',
					overflow: 'auto',
				}}
				dense
				component="div"
				role="list"
			>
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`

					return (
						<ListItem
							key={(value, Math.random() * 10000)}
							role="listitem"
							button
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value[0]} />
							<ListItemText
								id={labelId}
								primary={dayjs(value[1]).format('DD/MM/YYYY')}
							/>
						</ListItem>
					)
				})}
				<ListItem />
			</List>
		</Card>
	)

	return (
		<>
			<Grid container spacing={3} justifyContent="center" alignItems="center" sx={{margiTop: 5}}>
				<Grid item>{customList('Awaiting Install', left, owed)}</Grid>
				<Grid item>
					<Grid container direction="column" alignItems="center">
						<Card sx={{ minWidth: 275 }} elevation={1}>
							<CardContent>
								<Box
									sx={{
										width: 250,
										marginBottom: '5%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'left',
										flexDirection: 'column',
									}}
								>
									<TextField
										id="standard-basic"
										label="Postcode"
										name="postcode"
										variant="outlined"
										sx={{ marginBottom: '10px' }}
										onChange={(newValue) => {
											setPostcode(newValue.target.value)
											if (newValue.target.value) setError(false)
										}}
										error={error}
									/>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DesktopDatePicker
											value={date}
											minDate={dayjs('2022-01-01')}
											maxDate={Date.now()}
											onChange={(newValue) => {
												setDate(newValue)
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
									<Button
										sx={{ my: 1 }}
										variant="contained"
										size="medium"
										onClick={() => handleSubmit()}
										aria-label="soldJob"
									>
										Add Sold Job
									</Button>
									{buttonOption()}
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-around',
											marginTop: '20px',
										}}
									>
										<Button
											sx={{ my: 0.5 }}
											variant="contained"
											size="small"
											onClick={handleCheckedLeft}
											disabled={rightChecked.length === 0}
											aria-label="move selected left"
										>
											&lt;
										</Button>
										<Button
											sx={{ my: 0.5 }}
											variant="contained"
											size="small"
											onClick={handleCheckedRight}
											disabled={leftChecked.length === 0}
											aria-label="move selected right"
										>
											&gt;
										</Button>
									</Box>
								</Box>
							</CardContent>
						</Card>
						<Typography sx={{ marginTop: '10px' }} variant="subtitle2">
							Ordered by {sortBy === 'Post' ? 'Postcode' : 'Date'}
						</Typography>
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="large"
							onClick={() => handleOrder()}
							aria-label="Order by ?"
						>
							Change
						</Button>
					</Grid>
				</Grid>

				<Grid item>{customList('Installed', right, paid)}</Grid>
			</Grid>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					marginTop: '10px',
				}}
			>
				<Typography variant="h5">
					Grand Total £{(left.length + right.length) * 100}
				</Typography>
			</Box>
		</>
	)
}
