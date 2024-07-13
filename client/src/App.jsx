import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout'
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import NotFound from './components/NotFound';
import Login from './components/Login';

function App() {
  return (
  
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='services' element={<Services/>}/>
        </Route>
        <Route path='login' element={<Login/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App