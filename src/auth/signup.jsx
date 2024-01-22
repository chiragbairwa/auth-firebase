import './auth.css'
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { containsCapital, containsLower, containsNumber, validLength } from './validations'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase/firebase";
import toast from 'react-hot-toast'

export const SignUp = () => {
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, user => { user && navigate("/") })
  },[])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const submitHandler = async (event) => {
    event.preventDefault()
    if (formData.password === formData.confirmPassword) {
      switch (true) {
        case containsCapital(formData.password):
          console.log("Contains Capital")

        case containsLower(formData.password):
          console.log("Contains Lowercase")

        case containsNumber(formData.password):
          console.log("Contains Number")

        case validLength(formData.password):
          createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async (userCredential) => {
              const { email, uid, displayName, emailVerified } = userCredential.user
              const data = {
                uid: uid,
                email: email,
                username: displayName,
                emailVerified: emailVerified
              }
              toast('Signed Up')
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => console.log("done"))
      }
    }
    else {
      console.log("Password does not Match")
    }
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
      <h2>Sign Up</h2>
      <label>Email : <input type="email" name="email" onChange={onChangeHandler} required placeholder="abc@gmail.com" /></label>
      <label>Password : <input type="password" name="password" onChange={onChangeHandler} required placeholder="*******" /></label>
      <label>Confirm Password : <input type="password" name="confirmPassword" onChange={onChangeHandler} required placeholder="*******" /></label>

      <div>
        <button type="submit">Sign Up</button>
      </div>
      <span>
        {`Already have an account ? `}
        <Link to="/signin">Sign In</Link>
      </span>
    </form>
  )
}