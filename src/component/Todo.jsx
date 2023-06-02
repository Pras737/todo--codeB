import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!storedUser);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setTodos(user.todos || []);
    }
  }, []);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
// [a,b,c] +d => [a,b,c,d]
    const user = JSON.parse(storedUser);
    const updatedTodos = [...todos, todo];
    user.todos = updatedTodos;
    localStorage.setItem('user', JSON.stringify(user));
    setTodos(updatedTodos);

    setTodo('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setTodos([]);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setTodo(todos[index]);
  };

  const handleSaveTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = todo;
    setTodos(updatedTodos);
    setEditIndex(-1);
    setTodo('');
  };

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="card">
      <h2>Todo</h2>
      <input type="text" value={todo} onChange={handleTodoChange} placeholder="Enter todo" />
      {editIndex !== -1 ? (
        <button onClick={handleSaveTodo}>Save Todo</button>
      ) : (
        <button onClick={handleAddTodo}>Add Todo</button>
      )}
      <button onClick={handleLogout}>Logout</button>

      <h3>Todo List:</h3>
      {todos.map((item, index) => (
        <div key={index}>
          {index === editIndex ? (
            <input type="text" value={todo} onChange={handleTodoChange} />
          ) : (
            <span>{item}</span>
          )}
          {index === editIndex ? (
            <button onClick={handleSaveTodo}>Save</button>
          ) : (
            <button onClick={() => handleEditTodo(index)}>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
