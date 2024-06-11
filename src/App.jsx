import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  //& when App gets mounted useEffect() runs only once
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        console.log("I am in useeffect in App", userData)
        if (userData) {
          //*{ userData } is an object literal shorthand syntax for { userData: userData }
          dispatch(login({ userData }))
        } else {
          //& logout() gives action object
          //& {
          //&   type: 'auth/logout'
          //& }
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))

  }, [])
  //* loading is false
  //& Outlet is used to render child components in createBrowserRouter()
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>

          TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App

