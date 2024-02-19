import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Hero from '../../components/Hero'
import Banner from '../../components/Banner';
export default function Dashboard() {

    const [userData, setUserdata]= useState([]);
    const [filterdata, setFilterdata]= useState([]);
    const [query, setQuery] = useState('');
   
    useEffect( ()=>{
        const getUserdata= async()=>{
        const reqData= await fetch("http://localhost:8100/auth/rooms/available");
        const resData= await reqData.json();
        //console.log(resData);
        setUserdata(resData);
        setFilterdata(resData);

        }
        getUserdata();
    },[]);
  
    const handlesearch=(event)=>{
      const getSearch= event.target.value; 
      if(getSearch.length > 0)
      {     
       const searchdata= userData.filter( (item)=> item.roomType.toLowerCase().includes(getSearch));
       setUserdata(searchdata);
      } else {
        setUserdata(filterdata);
      }
      setQuery(getSearch);
    }


    return (
    <>
        <div>
        <Hero hero="roomsHero">
        </Hero>
        <Banner title="Dashboard" subtitle="Search for Best in Class Rooms">
                <NavLink to="/" className="btn btn-warning">
                      RETURN HOME
                </NavLink>
        </Banner>
        <div className='container'>
                <div className='row mt-3'> 
                    <div className='col-md-12 mt-3 mb-3'>
                    <h1 className='login-register-h1'>Search your Prefered Room</h1>                
                        <div className="col-md-6">                
                        <input  type="text" name='name' value={query}   className="form-control" onChange={(e)=>handlesearch(e)} placeholder='Search Rooms...' />
                    </div>          
                    </div>

                    
                    <div className='col-md-12'>
                    <table className="table" style={{ color: "#fff" }}>
                    <thead>
                        <tr>
                        {/* <th>Serial No.</th>
                        <th>Room Id </th> */}
                        <th>Images</th>
                        <th>Room Id</th>
                        <th>Room Type</th>
                        <th>Booking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        userData.map( (getUser, index)=>(
                        <tr key={index}>
                        {/* <td>{index+1} </td>
                        <td>{getUser.id}</td> */}
                        <td><img src={getUser.image} className="img" alt='img'/></td>
                        <td>{getUser.roomId}</td>
                        <td className='roomType-text'>{getUser.roomType}</td>
                        <td><NavLink to={"/user/RoomReservation"} state={{data:getUser}}><button type='search' className="btn-primary">Reserve Room</button></NavLink></td>
                        </tr>
                        )) }  
                            
                    </tbody>
                    </table>
                    </div>
                </div>
        </div>
        

            {/*<Routes>
                <Route exact path='/RoomReservation/:id' element={<Reservation/>}/>
            </Routes>*/}
    </div>
    </>
    
    )
}
