import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import './App.css'; // Importing the CSS file
function App() {
const [todos, setTodos] = useState([]);
useEffect(() => {
const fetchTodos = async () => {
try {
const result = await axios.get('http://localhost:5000/todos');
setTodos(result.data);
} catch (err) {
console.error("Error fetching todos:", err);
}
};
fetchTodos();
}, []);
const addTodo = async (text) => {
try {
const result = await axios.post('http://localhost:5000/todos', { text });
setTodos([...todos, result.data]);
} catch (err) {
console.error("Error adding todo:", err);
}
};
const removeTodo = async (id) => {
try {
await axios.delete(`http://localhost:5000/todos/${id}`);
setTodos(todos.filter(todo => todo._id !== id));
} catch (err) {
console.error("Error deleting todo:", err);
}
};
const editTodo = async (id, updatedText, updatedCompleted) => {
try {
const result = await axios.put(`http://localhost:5000/todos/${id}`, {
text: updatedText,
completed: updatedCompleted
});
setTodos(todos.map(todo => (todo._id === id ? result.data : todo)));
} catch (err) {
  console.error("Error updating todo:", err);
  }
  };
  const toggleComplete = async (id, completed) => {
  try {
  const result = await axios.put(`http://localhost:5000/todos/${id}`, {
  completed: completed
  });
  setTodos(todos.map(todo => (todo._id === id ? result.data : todo)));
  } catch (err) {
  console.error("Error toggling todo completion:", err);
  }
  };
  return (
  <div className="App">
  <h1>Todo App</h1>
  <AddTodo onAddTodo={addTodo} />
  <TodoList todos={todos} onRemoveTodo={removeTodo} onEditTodo={editTodo}
  onToggleComplete={toggleComplete} />
  </div>
  );
  }
  export default App;