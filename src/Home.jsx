import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth"

import { auth } from '../firebase/firebase'
import toast from 'react-hot-toast'

export const Home = () => {
  const [User, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, user => {
      user && setUser(user)
    })
  },[])

  const handleSignOut = async ()=>{
    await signOut(auth)
    .then(() => {
      // Sign-out successful.
      setUser(null)
      toast("Signed Out")
      navigate("/signin");
      console.log("Signed out successfully")
    })
    .catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    })
  }

  return (
    <>
    {User ? 
      <>
        <h1>uid {" - " + User.uid}</h1> 
        <button onClick={handleSignOut}>LogOut</button>
      </>
      :
      <>
        <h1>Sign In First</h1>
        <Link to="/signin" className='btn'>Sign In</Link>
      </>
    }
    </>
  )
}