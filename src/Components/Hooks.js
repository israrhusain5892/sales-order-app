import axios from 'axios';


export const doLoginPost=async ({email,password})=>{
      
    const res=await axios.post("https://recruitment-api.pyt1.stg.jmr.pl/login",{email,password})
    console.log(res.data);
    return res.data;  
 }

  

 export const createOrder=()=>{
      
 }