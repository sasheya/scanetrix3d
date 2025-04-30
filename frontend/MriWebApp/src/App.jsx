import { useState } from 'react'
import './App.css'
import LoginForm from './components/loginForm'
import NavBar from './components/navBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar />
    <LoginForm />
    <div>hellow world</div>
    </>
  )
}

export default App
