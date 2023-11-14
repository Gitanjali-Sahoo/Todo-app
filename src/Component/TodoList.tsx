import { useState, ChangeEvent, FormEvent } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';

interface Task {
    task: string;
    time: string;
}

const TodoList = () => {
    const [currentTask, setCurrentTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask(e.target.value);
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editIndex !== null) {
            // Editing existing task
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = { task: currentTask, time: new Date().toLocaleTimeString() };
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            // Adding new task
            const newTask: Task = { task: currentTask, time: new Date().toLocaleTimeString() };
            setTasks([...tasks, newTask]);
        }

        setCurrentTask('');
    };

    const deleteTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        setEditIndex(null); // Reset editIndex if a task is deleted
    };

    const editTask = (index: number) => {
        setEditIndex(index);
        setCurrentTask(tasks[index].task);
    };

    return (
        <div className="todo-container">
            <form action="submit" onSubmit={handleFormSubmit} className="todo-form">
                <input
                    className="todo-input"
                    type="text"
                    placeholder="Enter task....."
                    value={currentTask}
                    onChange={handleInput}
                />
                <button className="todo-button">{editIndex !== null ? <FaCheck /> : 'Add Task'}</button>
            </form>
            <div className="todo-tasks">
                {tasks.map((taskData, index) => (
                    <ul className="todo" key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={currentTask}
                                    onChange={handleInput}
                                />
                                <FaCheck onClick={handleFormSubmit} />
                            </>
                        ) : (
                            <>
                                <li className="delete-task">{taskData.task}</li>
                                <FaEdit onClick={() => editTask(index)} />
                            </>
                        )}
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
