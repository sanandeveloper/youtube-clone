import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../store/authSlice'

function LogoutBtn() {
  
    const dispatch=useDispatch()

    const logout=()=>{
      dispatch(logoutUser())
        
    }


  return (
    <div>
        
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default LogoutBtn