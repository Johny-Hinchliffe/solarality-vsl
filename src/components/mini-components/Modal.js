import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '.5px solid #000',
	borderRadius: '20px',
	boxShadow: 15,
	p: 4,
	maxWidth: '70vw',
}

export default function BasicModal({
	content,
	title,
	button,
	rightChecked,
	modalState,
    setModalState,
	buttonStyle
	
}) {
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	console.log(style)
	return (
		<>
			<Button
				sx={{ mt: buttonStyle?.mt }}
				variant={buttonStyle?.variant || 'contained'}
				size={buttonStyle?.size || "small"}
				type="submit"
				onClick={handleOpen}
				disabled={rightChecked?.length > 0}
				color={buttonStyle?.color || 'success'}
			>
				{button}
			</Button>
			{content ? (
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					elevation={24}
				>
					<Box sx={style}>
						<Typography
							id="modal-modal-title"
							variant="h5"
							component="h2"
							textAlign="center"
						>
							{title}
						</Typography>

						{content}
					</Box>
				</Modal>
			) : null}
		</>
	)
}
