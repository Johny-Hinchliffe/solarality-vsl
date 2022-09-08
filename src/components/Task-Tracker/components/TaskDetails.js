import { useState, useEffect } from 'react'
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'

const LOCAL_STORAGE_KEY = 'SecrentPassword'
const TaskDetails = () => {
	const [loading, setLoading] = useState(true)
	const [task, setTask] = useState({})

	const params = useParams()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		const foundTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).find(
			(task) => task.id === params.id
		)
		setTask(foundTodo)
		setLoading(false)
		}, [])

	useEffect(() => {
		return () => {
			setTask({})
		}
	}, [])

	return loading ? (
		<h3>Loading...</h3>
	) : (
		<div>
			<h3>{task.text}</h3>
			<p>{task.day}</p>
			<Button
				onClick={() => {
					navigate(-1)
				}}
				text="Go Back"
			/>
		</div>
	)
}

export default TaskDetails
