import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide({ title, amount, info }) {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Button
				sx={{ textTransform: 'none' }}
				varaint="contained"
				onClick={handleClickOpen}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h5">{title}</Typography>
					<Typography variant="h5">{amount}</Typography>
				</Box>
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle
					color="primary"
					textAlign="center"
					fontSize={26}
				>{`${title} Info`}</DialogTitle>
				<DialogContent>
					{info.map((el) => {
						return (
							<Box key={el[0]}>
								<Typography variant="h5" textAlign="center">
									{el[0]} : {el[1]}
								</Typography>
								<Typography
									sx={{ color: 'transparent' }}
									variant="subtitle1"
									textAlign="center"
								>
									_______________
								</Typography>
							</Box>
						)
					})}
				</DialogContent>
			</Dialog>
		</div>
	)
}
