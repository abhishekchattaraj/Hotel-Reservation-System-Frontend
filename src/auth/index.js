//isLoggedIn => 
export const isLoggedIn = () =>{
    let data = localStorage.getItem("data");
    if(data===null){
        return false;
    }
    else{
        return true;
    }
};

//doLogin=> data=>to localstorage
export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next()
};

//dologout=> remove from localstorage
export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next()
}

//getCurrentUser
export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"));
    }
    else{
        return undefined;
    }
};