import React from 'react';
import {Route, Routes} from 'react-router-dom'
import './App.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={"Hello World"}/>
        <Route path='affiliate/login' element={"Hi World"} />
      </Routes>
    </div>
  );
}

export default App;
