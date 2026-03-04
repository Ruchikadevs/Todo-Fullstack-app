import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "/todos";

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = () => {
        if (!title.trim()) return;

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, completed: false })
        })
            .then(res => res.json())
            .then(newTodo => {
                setTodos([...todos, newTodo]);
                setTitle("");
            });
    };

    const toggleTodo = (todo) => {
        fetch(`${API_URL}/${todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...todo, completed: !todo.completed })
        })
            .then(res => res.json())
            .then(updated => {
                setTodos(todos.map(t => t.id === updated.id ? updated : t));
            });
    };

    const deleteTodo = (id) => {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            });
    };

    return (
        <div className="app">
            <div className="card">
                <h1>My Tasks</h1>

                <div className="input-row">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button onClick={addTodo}>Add</button>
                </div>

                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} className={todo.completed ? "completed" : ""}>
                            <div className="task-left">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo)}
                                />
                                <span>{todo.title}</span>
                            </div>
                            <button className="delete" onClick={() => deleteTodo(todo.id)}>
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default App;