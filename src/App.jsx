import './App.css'

import { Home } from './Home';
import { SignIn } from './auth/signin'
import { SignUp } from './auth/signup'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App
