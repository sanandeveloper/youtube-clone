import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/SignUp'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'

function App() {

  
  return (
    <>
    <Header/>
   <main>
    <Outlet/>
   </main>
    </>
  )
}

export default App
