import React from "react";
// import {reserve} from '../services/user-service';
import Axios from "axios";
import {toast} from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../../auth';

export default function Reservation(props) {

  const location = useLocation()
  const navigate = useNavigate()
    // console.log(location);
    // console.log(props);

    //For Sending customer ID from Local Storage
    const [login, setLogin]=useState(false)
    const [data, setData]=useState("")

     useEffect(()=>{

         setLogin(isLoggedIn())
         setData(getCurrentUserDetail())

    },[login])

    //End of localstorage data fetch

    const  from  = location.state?.data;
    const url="http://localhost:8100/auth/rooms/reservation"
    const [user, setUser] = useState({
        roomId: "",
        customerId:"",
        roomType: "",
        fromDate: "",
        toDate: "" 
      })
    function handle(e){
        const newUser={...user}
        newUser[e.target.id]=e.target.value
        setUser(newUser);
    }
    function submit(e){
        e.preventDefault();
        Axios.post(url,{
            roomId:from.roomId,
            customerId:data.customerId,
            roomType:from.roomType,
            fromDate:user.fromDate,
            toDate:user.toDate,
        })
        .then(res=>{
            console.log(res.user)
            toast.success("Reserved Room Successfully")
            navigate("/user/MyBookings")
        })
    }

    
    return(
      <>
      <div className='reservation-container'>
      <h1 className='login-register-h1 '>Room Reservation</h1>
          <form action="" className='reservation-form' onSubmit={(e)=>submit(e)}>
              
              <label htmlFor='fromDate' className="reservation-page-label">Check-In</label>
              <input type="Date" className="reservation-page-input" autoComplete='off'
                     value={user.fromDate}
                     onChange={(e)=>handle(e)}
                     name='fromDate' id="fromDate" required />
              
              
              <label htmlFor='toDate' className="reservation-page-label">Check-Out</label>
                <input type="Date" className="reservation-page-input" autoComplete='off'
                  value={user.toDate}
                  onChange={(e)=>handle(e)}
                  name='toDate' id="toDate" required/>
              
              {/* <div>
                <label htmlFor='Lastname' className="form-label">RoomId is = {from.roomId}</label>
                <input type="number" className="form-control" 
                placeholder='Enter the above roomId'
                autoComplete='off'
                  value={user.roomId}
                  onChange={(e)=>handle(e)}
                  name='lastname' id="roomId" />
              </div> */}


                {/* <label htmlFor='customerId' className="reservation-page-label">Customer Id</label>
                <input type="number" className="reservation-page-input" placeholder="0" autoComplete='off'
                  value={user.customerId}
                  onChange={(e)=>handle(e)}
                  name='customerId' id="customerId" /> */}
              
              {/* <div>
                <label htmlFor='Lastname' className="form-label">Room Type = {from.roomType}</label>
                <input type="text" className="form-control" 
                placeholder='Enter the above room Type'
                autoComplete='off'
                  value={user.roomType}
                  onChange={(e)=>handle(e)}
                  name='lastname' id="roomType" />
              </div> */}
              <button type="submit" className=" reservation-btn ">Submit</button>
              
            
          </form>
      </div>
      </>
    )
}