import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const LOCAL_STORAGE_KEY = 'SecrentPassword'

const App = () => {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const tasksStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
			setTasks(tasksStorage)
			console.log(tasksStorage)
		}
		getTasks()
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
	}, [tasks])

	//Add Task
	const addTask = async (task) => {
		task.id = uuidv4()
		setTasks([...tasks, task])
	}

	//Delete Task List
	const deleteTask = async (id) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	// Toggle reminder

	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !task.reminder } : task
			)
		)
	}

	return (
		<>
			<div className="container1">
				<Header
					onAdd={() => setShowAddTask(!showAddTask)}
					showAddTask={showAddTask}
				/>
				{showAddTask && <AddTask onAdd={addTask} />}
				{tasks.length > 0 ? (
					<Tasks
						tasks={tasks}
						onToggle={toggleReminder}
						onDelete={deleteTask}
						setTasks={setTasks}
					/>
				) : (
					'Add a Task 😁'
				)}
			</div>
		</>
	)
}

export default App
