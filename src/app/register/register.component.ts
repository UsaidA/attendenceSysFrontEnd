import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Registration} from "../../classes"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  registerText = "";

  ngOnInit(): void {


    
  }

  
  passMatch(passOne:any, passTwo :any): boolean{

    if(passOne === passTwo){
      return true
    }
    else{
      return false
    }


  }

  sendRegisterRequest(email:any,password:any, repeatPass: any ){

   if( this.passMatch(password.value, repeatPass.value)){

    const registration = new Registration(email.value, password.value);
   
    console.log(registration)
    const JSONOBJ = JSON.stringify(registration);
    console.log(JSONOBJ)
    axios.post('http://localhost:8888/api/register', JSONOBJ, {headers:{'Content-Type':'application/json'}})
    .then((response) => {
      // Success 🎉
      console.log(response);
  })
  .catch((error) => {
      // Error 😨
      if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.registerText = "Email already registered"
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

   }else{

    console.log("passwords must match")
    this.registerText= "Passwords do not match"
   }


   

  }



}
