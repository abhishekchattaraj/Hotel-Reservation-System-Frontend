import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Hero from '../../components/Hero'
import Banner from '../../components/Banner';
import { isLoggedIn, getCurrentUserDetail } from '../../auth';
export default function MyBookings() {

    const [userData, setUserdata]= useState([]);
    const [filterdata, setFilterdata]= useState([]);

    const [login, setLogin]=useState(false)
    const [customer, setCustomer]=useState("")

     useEffect(()=>{

         setLogin(isLoggedIn())
         setCustomer(getCurrentUserDetail())

    },[login])
   
    useEffect( ()=>{
        const getUserdata= async()=>{
        const reqData= await fetch("http://localhost:8100/auth/rooms/allReserved");
        const resData= await reqData.json();
        //console.log(resData);
        setUserdata(resData);
        setFilterdata(resData);

        }
        getUserdata();
    },[]);
    
    


    return (
    <>
        <div>
        <Hero hero="bookingsHero">
          
        </Hero>
        <Banner title="My Booked Rooms" subtitle="The Rooms you have booked">
                
        </Banner>
        <div className='container'>
                <div className='row mt-3'>  
                    <div className='col-md-12'>
                    <table className="table" style={{ color: "#fff" }}>
                    <thead>
                        <tr>
                        {/* <th>Serial No.</th>
                        <th>Room Id </th> */}
                        <th>Reservation Id.</th>
                        <th>Images</th>
                        <th>Room Type</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Cancel Reservation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        userData.map( (getUser, index)=>{
                          if(getUser.customerId === customer.customerId){
                            return(
                              <>
                              <tr key={index}>
                        {/* <td>{index+1} </td>
                        <td>{getUser.id}</td> */}
                        <td>{getUser.reservationId}</td>
                        <td><img src={`/../images/room-`+ getUser.roomId +`.jpeg`} className="img" alt='img'/></td>
                        <td className='roomType-text'>{getUser.roomType}</td>
                        <td className='roomType-text'>{getUser.fromDate}</td>
                        <td className='roomType-text'>{getUser.toDate}</td>
                        <td><NavLink to={"/user/CancelReservation"} state={{data:getUser}}><button type='submit' className="cancel-btn">Cancel Room</button></NavLink></td>
                        </tr>
                              </>
                            )
                          }
                          
                        
                        }) 
                        }  
                            
                    </tbody>
                    </table>
                    </div>
                </div>
        </div>
    </div>
    </>
    
    )
}
