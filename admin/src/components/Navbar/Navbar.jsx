import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = ({ onLogout }) => {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo'/>
      <img src={assets.profile_img} alt="" className='profile'/>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Navbar
