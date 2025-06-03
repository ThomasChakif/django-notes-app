import react from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function Logout() {
  localStorage.clear() //clear access and refresh tokens
  return <Navigate to="/login"/>
}

function RegisterAndLogout() {
  localStorage.clear() //when registering, we clear to make sure we dont have any old tokens lingering still
  return <Register />
}



function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          // only allow Home within protected route
          <ProtectedRoute>
            <Home /> 
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="/register" element={<Register />}/>
      {/* not found is like a 404 page */}
      <Route path="*" element={<NotFound />}/> 
    </Routes>
   </BrowserRouter>
  )
}

export default App
