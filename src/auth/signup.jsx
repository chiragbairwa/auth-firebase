import './auth.css'
import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { containsCapital, containsLower, containsNumber, validLength } from './validations'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase/firebase";

export const SignUp = () => {
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && navigate("/")
    })
  })

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
          console.log("containsCapital")

        case containsLower(formData.password):
          console.log("containsLower")

        case containsNumber(formData.password):
          console.log("containsNumber")

        case validLength(formData.password):
          console.log(formData)
          await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async (userCredential) => {
              const { email, uid, displayName, emailVerified } = userCredential.user
              const data = {
                uid: uid,
                email: email,
                username: displayName,
                emailVerified: emailVerified
              }
              console.log(data)
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
      <NavLink to="/signin">
        Already have an account ? Sign In
      </NavLink>
    </form>
  )
}