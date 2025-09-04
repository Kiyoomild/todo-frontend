import { useEffect, useState } from "react";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "./api";


interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!newTodo.trim()) return;  
    const todo = await addTodo(newTodo); 
    setTodos([...todos, todo]);          
    setNewTodo("");                       
  };

  /*const handleAdd = async () => {
    if (!newTodo.trim()) return;
    await addTodo(newTodo);
    setNewTodo("");
    loadTodos();
  };
  */
  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    await toggleTodo(id, !todo.completed);
    loadTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    loadTodos();
  };

  return (
    <div>
      {/* Header */}
      <h1>Todo List</h1>

      <div className="app-container">
        <div className="box">
          <div className="row">
            <input className="text-box" type="text" id="input-box" placeholder="Enter new todo..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
              <button className="add-btn" onClick={handleAdd}>
                Add
              </button>
          </div>
          
          <ul id="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                <input className="checkbox" type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
                <span>{todo.title}</span>
                <button className="delete-btn" onClick={() => handleDelete(todo.id)}>X</button>
              </li>
            ))}
          </ul> 
        </div>
      </div>
    </div>
  );
}

export default App;
