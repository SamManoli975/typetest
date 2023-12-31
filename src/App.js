// import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {

  const sayhello = () =>{
    console.log('sayHello');
  }
  return (
    <div>
      <h1>hello</h1>
      <h2>h2</h2>
      <button onClick={sayhello}>hello</button>
    </div>
  );
}

export default App;
