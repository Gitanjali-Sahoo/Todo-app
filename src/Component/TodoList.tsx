import { useState, ChangeEvent, FormEvent } from 'react'

const TodoList = () => {
    const [currentTask, setCurrentTask] = useState<string>('')
    const [Tasks, setTasks] = useState<string[]>([])

    const hadleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask(e.target.value)
        console.log(currentTask)
    }

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        setTasks([...Tasks, currentTask])
        setCurrentTask('')
    }

    return (
        <div>
            <form action="submit" onSubmit={submitForm}>
                <input
                    type="text"
                    placeholder="Enter task....."
                    value={currentTask}
                    onChange={hadleInput}
                />
                <button>Add Task</button>
            </form>
            <div>
                {Tasks.map((task: string, index: number) => (
                    <ul key={index}>
                        <li>{task}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default TodoList
