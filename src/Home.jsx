import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth"

import { auth } from '../firebase/firebase'

export const Home = ()=>{
  const [User, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user)
      }
      return;
    }
    )
  })

  const handleSignOut = async ()=>{
    await signOut(auth)
    .then(() => {
      // Sign-out successful.
      navigate("/signin");
      setUser(null)
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
      <h1>uid {" - " + User.uid}</h1> 
      : 
      <h1>Sign In First</h1>
    }
    
    {User && <button onClick={handleSignOut}>LogOut</button>}
    {!User && <Link to="/signin" className='btn'>Sign In</Link>}
    </>
  )
}