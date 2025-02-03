import Home from './pages/Home'
import Navbar from './components/Navbar'
import Favourites from './pages/Favourites'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import {Register} from './pages/Register'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccessDenied from './pages/AccessDenied'
import Dashboard from './pages/Dashboard'



function App() {

  return (
    <Router>
      <Navbar  />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/accessdenied" element={<AccessDenied />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
        
       
      </Routes>
    </Router>
  )
}

export default App
