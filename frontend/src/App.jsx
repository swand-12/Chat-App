import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import './App.css'
import { Routes ,Route} from 'react-router-dom'
import HomePage from './pages/Home'
import SignupPage from './pages/SignUp'
import LoginPage from './pages/LogIn'
import SettingPage from './pages/Settings'
import ProfilePage from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
function App() {
  const {authUser,checkAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  return (
    <>
    <div>
      <NavBar/>
    </div>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/setting' element={<SettingPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
    </>
  )
}

export default App
