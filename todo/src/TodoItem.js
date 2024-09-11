import React, { useState } from 'react';
function TodoItem({ todo, onRemoveTodo, onEditTodo, onToggleComplete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);
    const handleEdit = () => {
    onEditTodo(todo._id, newText, todo.completed);
    setIsEditing(false);
    };
    const handleToggleComplete = () => {
    onToggleComplete(todo._id, !todo.completed);
    };
    return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
    {isEditing ? (
    <>
    <input
    type="text"
    value={newText}
    onChange={(e) => setNewText(e.target.value)}
    />
    <button onClick={handleEdit}>Save</button>
    </>
    ) : (
    <>
    <input
    type="checkbox"
    checked={todo.completed}
    onChange={handleToggleComplete}
    />
    <span style={{ flexGrow: 1 }}>{todo.text}</span> {/* Flex item for text
    */}
    <div>
    <button onClick={() => setIsEditing(true)}>Edit</button>
    <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
    </div>
    </>
    )}
    </li>
    );
    }
    export default TodoItem;