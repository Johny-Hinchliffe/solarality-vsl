import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import dateFormat from 'dateformat'

const LOCAL_STORAGE_KEY = 'SecrentPassword'

const Task = ({ task, onDelete, onToggle, setTasks, tasks }) => {
	// const editTask = () => {
	// 	swal('Edit Task', task.text, {
	// 		content: 'input',
	// 	}).then((value) => {
	// 		const newTask = task
	// 		const filtered = tasks.filter((findTask) => task.id !== findTask.id)
	// 		filtered.push({ ...newTask, text: value })
	// 		setTasks(filtered)
	// 	})
	// }

	return (
		<div
			className={`task ${task.reminder ? 'reminder' : ''}`}
			onDoubleClick={() => onToggle(task.id)}
		>
			<h3>
				{task.text}{' '}
				<FaTimes
					onClick={onDelete}
					style={{ color: 'red', cursor: 'pointer' }}
				/>
			</h3>
			<p>{dateFormat(task.day, 'dddd, mmmm dS, h:MM TT')}</p>
			{/* <p>
				<a onClick={() => editTask()}>Edit Task</a>
			</p> */}
		</div>
	)
}

export default Task
