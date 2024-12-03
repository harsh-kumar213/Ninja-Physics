import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Idea from './components/idea/IdeaListing.jsx';
import Project from './components/project/Project.jsx';

function App() {
  
  return (
    <>
      {/* <Login/> */}
      <Idea/>
    </>
  )
}

export default App
