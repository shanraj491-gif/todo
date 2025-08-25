import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Todo.css'
function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/todo", {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 401) {
        navigate("/login");
        return;
      }
      const data = await res.json();
      // console.log(data);
      // console.log(data[0].completed);
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/todo/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const updatedTodo = await res.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todo/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Add Todos</h2>
      <form onSubmit={addTodo}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      <h2>Your Todos</h2>
      {todos.length===0?
      <p>No todos Added</p>:
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>{todo.completed?<button className="btn mark" onClick={() => toggleTodo(todo._id)}>✅</button>:
            <button className="btn mark" onClick={() => toggleTodo(todo._id)}>⬜</button>}
            
            <button className="btn mark" onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>}
      
    </div>
  );
}

export default Todo;
