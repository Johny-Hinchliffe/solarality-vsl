import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Checkbox, Button, Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import RestoreIcon from '@mui/icons-material/Restore'
import dayjs from 'dayjs'

export default function DeleteBin({ deleted, setDeleted, left, setLeft, not }) {
	const [checked, setChecked] = React.useState([])

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

	const handleSubmit = () => {
		// setDeleted(deleted.concat(rightChecked).sort())
		// setDeleted(deleted.concat(leftChecked).sort())
		// setRight(not(right, rightChecked))
		// setLeft(not(left, leftChecked))
		// setChecked(not(checked, leftChecked))
		// setChecked(not(checked, rightChecked))
		setLeft(left.concat(checked).sort())
		setDeleted(not(deleted, checked))
		setChecked([])
	}

	const handlePurge = () => {
		setDeleted(not(deleted, checked))
		setChecked([])
	}
	return (
		<>
			<Box
				sx={{ marginRight: '10px', display: 'flex', justifyContent: 'right' }}
			>
				<Button
					onClick={handlePurge}
					color= 'error'
					disabled={checked.length === 0}
					startIcon={<DeleteSweepIcon />}
				>
					Purge
				</Button>
			</Box>
			<List
				sx={{
					width: '100%',
					maxWidth: 360,
					bgcolor: 'background.paper',
					position: 'relative',
					overflow: 'auto',
					maxHeight: 300,
					'& ul': { padding: 0 },
				}}
			>
				{deleted.map((value) => {
					const labelId = `checkbox-list-label-${value[0]}`

					return (
						<ListItem key={Math.random() * 100} disablePadding>
							<ListItemButton
								role={undefined}
								onClick={handleToggle(value)}
								dense
							>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={checked.indexOf(value) !== -1}
										tabIndex={-1}
										disableRipple
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								</ListItemIcon>
								<ListItemText id={labelId} primary={value[0]} />
								<ListItemText
									id={labelId}
									primary={dayjs(value[1]).format('DD/MM/YYYY')}
								/>
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
			<Box
				sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
			>
				<Button
					size="large"
					variant="contained"
					disabled={checked.length === 0}
					onClick={handleSubmit}
                    
				>
					<RestoreIcon sx={{ marginRight: '10px' }} /> Restore
				</Button>
			</Box>
			<Box
				sx={{marginTop: 3, marginRight: '10px', display: 'flex', justifyContent: 'left' }}
			>
				<Typography>Total Lost £{!deleted ? 0 : deleted.length * 100}</Typography>
			</Box>
		</>
	)
}
