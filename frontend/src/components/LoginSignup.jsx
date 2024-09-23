import React, { useState } from 'react'
import axios from 'axios'
import '../styles/styles.css'
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {
  const [activeForm, setActiveForm] = useState('login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleToggle = (form) => {
    setActiveForm(form)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url =
        activeForm === 'login'
          ? 'http://localhost:5000/api/login'
          : 'http://localhost:5000/api/signup'
      const response = await axios.post(url, formData, {
        withCredentials: true,
      }) // Ensure cookies are sent
      // navigate('/dashboard', { state: { username: response.data.username, email: response.data.email } });
      window.location.replace('/dashboard')
    } catch (error) {
      alert(`Error: ${error.response?.data || 'Something went wrong'}`)
    }
  }

  return (
    <div className='login-signup-container'>
      {/* Login Form */}
      <div
        className={`login-signup ${
          activeForm === 'login' ? 'l-attop' : 'l-atbottom'
        }`}
        id='login'
        onClick={() => handleToggle('login')}
      >
        <div className='login-signup-title'>LOG IN</div>
        <div className='login-signup-content'>
          <form onSubmit={handleSubmit}>
            <div className='input-name'>
              <h2>Username</h2>
            </div>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='field-input'
              required
            />
            <div className='input-name input-margin'>
              <h2>Password</h2>
            </div>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='field-input'
              required
            />
            <div className='input-r'>
              <div className='check-input'>
                <input
                  type='checkbox'
                  id='remember-me-2'
                  name='rememberme'
                  className='checkme'
                />
                <label
                  className='remmeberme-blue'
                  htmlFor='remember-me-2'
                ></label>
              </div>
              <div className='rememberme'>
                <label htmlFor='remember-me-2'>Remember Me</label>
              </div>
            </div>
            <button className='submit-btn' type='submit'>
              Login
            </button>
            <div className='forgot-pass'>
              <a href='/dashboard'>Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>

      {/* Signup Form */}
      <div
        className={`login-signup ${
          activeForm === 'signup' ? 's-attop' : 's-atbottom'
        }`}
        id='signup'
        onClick={() => handleToggle('signup')}
      >
        <div className='login-signup-title'>SIGN UP</div>
        <div className='login-signup-content'>
          <form onSubmit={handleSubmit}>
            <div className='input-name'>
              <h2>Username</h2>
            </div>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='field-input'
              required
            />
            <div className='input-name input-margin'>
              <h2>E-Mail</h2>
            </div>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='field-input'
              required
            />
            <div className='input-name input-margin'>
              <h2>Password</h2>
            </div>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='field-input'
              required
            />
            <button className='submit-btn' type='submit'>
              SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
