import { myAxios } from "./helper";

export const signUp = (user)=>{

    return myAxios
    .post('/auth/signup',user)
    .then((response)=> response.data)

}

export const loginUser = (loginDetail)=>{
    
    return myAxios
    .post('/auth/login',loginDetail)
    .then((response)=> response.data)
}

// export const reserve = (roomData)=>{

//     return myAxios
//     .post('/auth/rooms/reservation',roomData)
//     .then((response)=> response.data)

// }

export const deleteReservation = (roomData)=>{

    return myAxios
    .post('/auth/rooms/deleteReservation',roomData)
    .then((response)=> response.data)

}