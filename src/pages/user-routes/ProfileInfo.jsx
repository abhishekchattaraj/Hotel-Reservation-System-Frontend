import React from 'react';
import {useState, useEffect} from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../../auth';
import './ProfileInfo.css'

const ProfileInfo = () => {
  const [login, setLogin]=useState(false)
  const [user, setUser]=useState("")

     useEffect(()=>{

         setLogin(isLoggedIn())
         setUser(getCurrentUserDetail())

    },[login])
  return (
    
      <div className="main">
        <h1 className='login-register-h1'>Profile</h1>
        <div className="card">
            <div className="card-body">
                <i className="fa fa-pen fa-xs edit"></i>
                <table>
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>:</td>
                            <td>{user.firstName}</td>
                        </tr>
                        <tr>
                            <td>lastName</td>
                            <td>:</td>
                            <td>{user.lastName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>{user.emailAddress}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>:</td>
                            <td>{user.address}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>:</td>
                            <td>{user.phoneNumber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    
    
  )
}

export default ProfileInfo