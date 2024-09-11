import React from 'react';
import TodoItem from './TodoItem';
function TodoList({ todos, onRemoveTodo, onEditTodo, onToggleComplete }) {
return (
<ul>
{todos.map(todo => (
<TodoItem
key={todo._id}
todo={todo}
onRemoveTodo={onRemoveTodo}
onEditTodo={onEditTodo}
onToggleComplete={onToggleComplete} // Pass down onToggleComplete
function to TodoItem
/>
))}
</ul>
);
}
export default TodoList;