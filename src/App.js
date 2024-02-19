import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './components/Navbar';
import {Login} from './pages/Login';
import Footer from './components/Footer';
import {Register} from './pages/Register';
import Privateroute from './components/Privateroute';
import Dashboard from './pages/user-routes/Dashboard';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import Reservation from './pages/user-routes/Reservation';
import MyBookings from './pages/user-routes/MyBookings';
import {CancelReservation} from './pages/user-routes/CancelReservation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer position='top-center'/>
        <Navbar/>
        <Routes>
          <Route path="/hotel-reservation-react" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/user" element={<Privateroute/>}>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="profile-info" element={<ProfileInfo/>} />
            <Route path='RoomReservation' element={<Reservation/>}/>
            <Route path='MyBookings' element={<MyBookings/>}/>
            <Route path='CancelReservation' element={<CancelReservation/>}/>
          </Route>
          <Route component={Error}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
