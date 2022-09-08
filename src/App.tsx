import React from 'react'
import './App.css';
import ApiTodo from './components/apiTodo';
import Todo from './components/todo';

const App = () => {
  return (
    <div className="App">
      <Todo />
      <ApiTodo />
    </div>
  );
}

export default App;
