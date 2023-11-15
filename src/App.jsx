import {useContext} from 'react'
import {AuthContext} from './contexts/AuthContext'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'

import './style.scss'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"

function App() {

  const {loginUser} =useContext(AuthContext)

  const RoutingControl =({children})=>{
    if(!loginUser){
      return <Navigate to="/login"/>
    }

    return children
  }


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={<RoutingControl><Home/></RoutingControl>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App;
