import axios from "axios";
import { Attendence } from "./classes";

function attendLecture(accessToken: string, contents: Attendence, attendCode :string){

  const yourConfig = {
    headers: {
       Authorization: accessToken,
       attendCode: attendCode
    }
 }
 axios.post('http://localhost:8888/api/attendence/attend',contents, {headers:{'Content-Type':'application/json','Authorization': `${accessToken}`,'attendCode': `${attendCode}`}})
 .then((response) => {
   if(response.data =="cannot be empty" || response.data == "Et"){
   }else{
     const jsonUser = JSON.stringify(response.data)
     console.log(jsonUser, ": attend response")
     
   }
})
.catch((error) => {
   // Error 😨
   if (error.response) {
       
       console.log(error.response.data);
       console.log(error.response.status);
       console.log(error.response.headers);
   } else if (error.request) {
       /*
        * The request was made but no response was received, `error.request`
        * is an instance of XMLHttpRequest in the browser and an instance
        * of http.ClientRequest in Node.js
        */
       console.log(error.request);
   } else {
       // Something happened in setting up the request and triggered an Error
       console.log('Error', error.message);
   }
   console.log(error.config);

});

}
function sendAttendenceData(accessToken: string, contents :Attendence):void {
 
   const yourConfig = {
     headers: {
        Authorization: accessToken
     }
  }
  console.log(yourConfig)
  axios.put('http://localhost:8888/api/attendence/updateAttendence?=',contents, yourConfig)
  .then((response) => {
    if(response.data =="cannot be empty" || response.data == "Et"){
    }else{
      const jsonUser = JSON.stringify(response.data)
      console.log(jsonUser, ": update attendence response")
      
    }
 })
 .catch((error) => {
    // Error 😨
    if (error.response) {
        
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
 
 });

}

export{sendAttendenceData, attendLecture}