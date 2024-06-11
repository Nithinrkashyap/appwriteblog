import React from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {
  console.log("In pages Singup");
  return (
    <div className='py-8'>
      <SignupComponent />
    </div>
  )
}

export default Signup