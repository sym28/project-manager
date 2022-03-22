import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'

// pages and components

import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'
import Create from './pages/create/Create'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar></Sidebar>
        <div className="container">
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/projects/:id' element={<Project />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
