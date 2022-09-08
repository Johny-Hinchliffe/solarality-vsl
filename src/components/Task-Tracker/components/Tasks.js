import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, setTasks }) => {

	const orderedTasks = tasks.sort((a, b) => {
		return new Date(a.day) - new Date(b.day)
	})

	

	return (
		<>
			{orderedTasks.map((task) => (
				<Task
					tasks={tasks}
					setTasks={setTasks}
					key={task.id}
					task={task}
					onToggle={onToggle}
					onDelete={() => onDelete(task.id)}
				/>
			))}
		</>
	)
}

export default Tasks
