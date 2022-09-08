import { useState } from 'react'
import swal from 'sweetalert'

const AddTask = ({ onAdd }) => {
	const [text, setText] = useState('')
	const [day, setDay] = useState(new Date().toISOString().split(':').slice(0,2).join(':'))
	const [reminder, setReminder] = useState(false)


	const onSubmit = (e) => {
		e.preventDefault()
		if (!text) {
			return swal('Oops!', 'Please add a task', 'error')
		}
		const date = new Date()
		const news = date.toISOString().split(':').slice(0,2).join('')
		
	
		onAdd({ text, day, reminder })
		setText('')
		setDay(new Date().toISOString().split(':').slice(0,2).join(':'))
		setReminder('')
	}
	return (
		<form action="" className="add-form" onSubmit={onSubmit}>
			<div className="form-control">
				<label htmlFor="">Task</label>
				<input
					type="text"
					placeholder="Add Task"
					value={text}
					onChange={(e) => {
						setText(e.target.value)
					}}
				/>
			</div>
			<div className="form-control">
				<label htmlFor="">Date & Time</label>
				<input
					type="datetime-local"
					value={day}
					onChange={(e) => {
						setDay(e.target.value)
					}}
				/>
			</div>
			<div className="form-control form-control-check">
				<label htmlFor="">Reminder</label>
				<input
					type="checkbox"
					checked={reminder}
					value={reminder}
					onChange={(e) => {
						setReminder(e.currentTarget.checked)
					}}
				/>
			</div>
			<input className="btn1 btn-block" type="submit" value="Save Task" />
		</form>
	)
}

export default AddTask
