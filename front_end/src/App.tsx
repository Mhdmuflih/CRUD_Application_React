
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/User/Login/Login'
import SignUp from './pages/User/SignUp/SignUp'
import AdminLogin from './pages/Admin/Login/AdminLogin'
import Dashboard from './pages/Admin/Home/Dashboard'
import Home from './pages/User/Home/Home'
import UserLoginProtectors from './RouterProtectors/UserLoginProtectors'
import UserRouteProtectors from './RouterProtectors/UserRouteProtectors'
import AdminLoginProtector from './RouterProtectors/AdminLoginProtector'
import AdminRouteProtector from './RouterProtectors/AdminRouteProtector'
import AddUser from './pages/Admin/AddUser/AddUser'
import EditUser from './pages/User/EditUser/EditUser'

function App() {

  return (
    <div>

      
      <Routes>

        <Route element={<UserLoginProtectors />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
        </Route>

        <Route element={<UserRouteProtectors />}>
          <Route path='/home' element={<Home />} />
          <Route path='/edit-user' element={<EditUser />} />
        </Route>

        <Route element={<AdminLoginProtector />}>
          <Route path='/admin/login' element={<AdminLogin />} />
        </Route>

        <Route element={<AdminRouteProtector />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/add-user' element={<AddUser />} />
        </Route>


      </Routes>
    </div>
  )
}

export default App
