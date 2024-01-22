import './auth.css'
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import { auth } from "../../firebase/firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import toast from 'react-hot-toast'

export const SignIn = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && navigate("/")
    })
  },[])

  const submitHandler = async (event) => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        toast("Signed In")
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  const onChangeHandler = (event) => {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    setFormData(data)
  }

  return (
    <form onSubmit={submitHandler} className="container" >
      <h2>Sign In</h2>
      <label>Email : <input type="email" name="email" onChange={onChangeHandler} required placeholder="abc@gmail.com" /></label>
      <label>Password : <input type="password" name="password" onChange={onChangeHandler} required placeholder="*******" /></label>

      <div>
        <button type="submit">Sign In</button>
        <Link to="/signup">Sign Up</Link>
      </div>
    </form>
  )
}