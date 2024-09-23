import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/styles.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user data
        // const response = await axios.get('http://localhost:5000/api/login', { withCredentials: true });
        // setUserData(response.data);

        // Fetch all users
        const usersResponse = await axios.get(
          'http://localhost:5000/api/users',
          { withCredentials: true }
        )
        setUsers(usersResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        navigate('/login') // Redirect to login if not authenticated
      }
    }

    fetchData()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/logout',
        {},
        { withCredentials: true }
      )
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className='dashboard-container'>
      <div className='dashboard-welcome'>
        {/* <h1>Welcome, {userData.username}</h1> */}
        <h1>User Dashboard, 23MCA20405 !</h1>
        <a className='knowMore' href="https://mdshahbazansari.github.io/Portfolio-shahbaz/">Know More...</a>
        {/* <p>Your email: {currentUser?.email}</p>
        <p>Your login ID: {currentUser?._id}</p> */}
      <h1>All Users Details</h1>
      </div>
      <div className='user-list'>
        
        <table className='user-table'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='logoutBtn'>
      <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
