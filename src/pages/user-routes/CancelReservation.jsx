import React, { useState } from "react";
import {deleteReservation} from '../../services/user-service';
import {toast} from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";

export const CancelReservation = (props) => {

    const location = useLocation()
    const loc = location.state?.data;
    const navigate = useNavigate()
    const [data,setData] = useState({
      reservationId:loc.reservationId
    })

    const[error, setError] = useState({
      errors: {},
      isError:false,
    });

    

      const submitForm=(event)=> {

        event.preventDefault();

        if(error.isError){
          toast.error("Form data is Invalid!!!");
          return;
        }

        console.log(data);

        //data validate
        
        //call server api for sending data
        deleteReservation(data).then((resp)=>{
          console.log(resp)
          console.log("success log")
          toast.success("Room Cancelled Successfully!!")
          setData({
            reservationId:''
          })
          navigate('/user/MyBookings')
        }).catch((error)=>{
          console.log(error)
          console.log("Error log")

          setError({
            errors:error,
            isError:true
          })
        })
      }

    
    return(
        <div className="reservation-container">
            <h2 className="login-register-h1">Cancel Reservation</h2>
            <form className="reservation-form" onSubmit={submitForm}>

                <label className="reservation-page-label" htmlFor="reservationId">Reservation Id</label>
                <input className="reservation-page-input" 
                      value={loc.reservationId} 
                      name="reservationId" 
                      id="reservationId" 
                      placeholder="Enter the above Reservation Id" 
                      required/>

                <button className="cancel-btn">Cancel Reservation</button>
            </form>
            
        </div>
    )
}