import { useState, ChangeEvent, FormEvent } from 'react';

interface Task {
    task: string;
    time: string;
}

const TodoList = () => {
    const [currentTask, setCurrentTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask(e.target.value);
    };

    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        const newTask: Task = { task: currentTask, time: new Date().toLocaleTimeString() };
        setTasks([...tasks, newTask]);
        setCurrentTask('');
    };

    const deleteTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    return (
        <div className="todo-container">
            <form action="submit" onSubmit={submitForm} className="todo-form">
                <input
                    className="todo-input"
                    type="text"
                    placeholder="Enter task....."
                    value={currentTask}
                    onChange={handleInput}
                />
                <button className="todo-button">Add Task</button>
            </form>
            <div className="todo-tasks">
                {tasks.map((taskData, index) => (
                    <ul className="todo" key={index}>
                        <li className="delete-task">{taskData.task}</li>
                        <div className='todo-date'>
                            <button
                                className="delete-button"
                                onClick={() => {
                                    deleteTask(index);
                                }}
                            >
                                Delete Task
                            </button>
                            <h4>{taskData.time}</h4>
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
