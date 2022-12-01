import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import axios from 'axios';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Registration,Student, singletonAuth} from "../../classes"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { data } from 'jquery';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('')
  })

  constructor(public router :Router, private vcr:ViewContainerRef, private cfr: ComponentFactoryResolver) { }

  loginText = "";

  ngOnInit(): void {
  }


  sendLoginRequest(email: any, password: any){
    const registration = new Registration(email.value, password.value);
   
    console.log(registration)
    const JSONOBJ = JSON.stringify(registration);
    console.log(JSONOBJ)
    axios.post('http://localhost:8888/api/login', JSONOBJ, {headers:{'Content-Type':'application/json'}})
    .then((response) => {
      if (response.data =="failed password" || response.data == "Email doesn't exist"){

        this.loginText = "password or email incorrect"
        console.log(response.data, "this.logintext", this.loginText)
      }else{
        console.log(response.data.accessToken, " access token");

        const auth = singletonAuth.getInstance(response.data.accessToken);
        const stringfyUser = JSON.stringify(registration);
        localStorage.setItem('registered',stringfyUser)

        
        if(response.data.accessControl === 1){
          console.log(response.data.accessControl, " in TEACHER CONRTOLLKER")
          let promiseArr: Promise<any>[] = [];
          promiseArr[0] = this.getAllStudents(response.data.accessToken);
          promiseArr[1] = this.getAllStudentAttendences(response.data.accessToken);
          promiseArr[2] = this.getAttendenceCode(response.data.accessToken);
          promiseArr[3] = this.getGroupPercentages(response.data.accessToken);
          promiseArr[4] = this.getTeacherData(response.data.accessToken);
          Promise.all(promiseArr).then((values) => {
            console.log(values)
            console.log("inside teacher promise");
            this.loadTeacherDashboard();
          }).catch(error=> console.log('error'))
          
         

        }else if(response.data.accessControl === 0){

          console.log(response.data.accessControl, " in student CONRTOLLKER")
          let promiseArr: Promise<any>[] = [];
          promiseArr[0] = this.getAttendenceData(response.data.accessToken)
          console.log(this.getAttendenceData(response.data.accessToken))
          promiseArr[1] = this.getUserData(response.data.accessToken)
          promiseArr[2] = this.getLectureData(response.data.accessToken)
  
          Promise.all(promiseArr).then((values) => {
            console.log(values)
            console.log("inside promise");
            this.loadDashboard();
          }).catch(error=> console.log('error'))
        }

         
        
        
        
      }
      console.log(response);
     
  })
  .catch((error) => {
      // Error 😨
      if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.loginText = "User doesn't exist or credentials incorrect"
          console.log( "this.logintext", this.loginText)
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
    
    console.log(email.value);

  }

  getGroupPercentages(accessToken: string):Promise<any>{
    return new Promise((resolve, reject )=>{
      const yourConfig = {
        headers: {
           Authorization: accessToken
        }
     }
     axios.get('http://localhost:8888/api/attendence/getGroupAttendence', yourConfig)
     .then((response) => {
       if(response.data =="Admin Only Access" || response.data == "Some error occurred while getting group attendence."){
       }else{
         const jsonUser = JSON.stringify(response.data)
         console.log(jsonUser, ": group Percentages")
         localStorage.setItem('groupPercentages',jsonUser)
         resolve(response);
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
       reject(error)
    });
    })
  
  }

async loadTeacherDashboard(){

  this.vcr.clear();
  const {TeacherDashboardComponent} = await import('../teacher-dashboard/teacher-dashboard.component');
  this.vcr.createComponent(this.cfr.resolveComponentFactory(TeacherDashboardComponent));
  this.router.navigate(['/teacherDashboard']);
}

async loadDashboard(){
  this.vcr.clear();
  const {DashboardComponent} = await import('../dashboard/dashboard.component');
  this.vcr.createComponent(this.cfr.resolveComponentFactory(DashboardComponent));


  this.router.navigate(['/dashboard']);
}


getAttendenceCode(accessToken: string):Promise<any>{
  return new Promise((resolve, reject )=>{
    const yourConfig = {
      headers: {
         Authorization: accessToken
      }
   }
   axios.get('http://localhost:8888/api/attendence/getAttendCode', yourConfig)
   .then((response) => {
     if(response.data =="Admin Only Access" || response.data == "Some error occurred while getting attendCode."){
     }else{
       const jsonUser = JSON.stringify(response.data)
       console.log(jsonUser, ": attend Code")
       localStorage.setItem('attendCode',jsonUser)
       resolve(response);
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
     reject(error)
  });
  })

}

getAllStudentAttendences(accessToken: string):Promise<any>{
  return new Promise((resolve, reject )=>{
    const yourConfig = {
      headers: {
         Authorization: accessToken
      }
   }
   axios.get('http://localhost:8888/api/attendence/getAllAttendences', yourConfig)
   .then((response) => {
     if(response.data =="token not valid" || response.data == "Access denied"){
     }else{
       const jsonUser = JSON.stringify(response.data)
       console.log(jsonUser, ": teacher All Attendences")
       localStorage.setItem('allStudentAttendences',jsonUser)
       resolve(response);
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
     reject(error)
  });
  })
}

getAllStudents(accessToken: string):Promise<any>{
  return new Promise((resolve, reject )=>{
    
    const yourConfig = {
      headers: {
         Authorization: accessToken
      }
   }
   axios.get('http://localhost:8888/api/students/getAll', yourConfig)
   .then((response) => {
     if(response.data =="Admin Only Access" || response.data == "Email doesn't exist"){
     }else{
       const jsonUser = JSON.stringify(response.data)
       console.log(jsonUser, ": All Students")
       localStorage.setItem('allStudents',jsonUser)
       resolve(response);
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
     reject(error)
  });
  })
}

 getAttendenceData(accessToken: string):Promise<any>  {
  return new Promise((resolve, reject )=>{
    const yourConfig = {
      headers: {
         Authorization: accessToken
      }
   }
   axios.get('http://localhost:8888/api/attendence/getAttendence', yourConfig)
   .then((response) => {
     if(response.data =="failed password" || response.data == "Email doesn't exist"){
     }else{
       const jsonUser = JSON.stringify(response.data)
       console.log(jsonUser, ": json user Attendence")
       localStorage.setItem('attendence',jsonUser)
       resolve(response);
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
     reject(error)
  });
  })
}


getLectureData(accessToken:string) :Promise<any> {

  return new Promise((resolve, reject )=>{

    
  const yourConfig = {
    headers: {
       Authorization: accessToken
    }
 }
 axios.get('http://localhost:8888/api/lectures/allLectures', yourConfig)
 .then((response) => {
   if(response.data =="failed password" || response.data == "Email doesn't exist"){
   }else{
     const jsonUser = JSON.stringify(response.data)
     console.log(jsonUser, "  : lectures response")
     localStorage.setItem('lectures',jsonUser)
     resolve(response)
   }
  
})
.catch((error) => {
   // Error 😨
   if (error.response) {
       /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
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
  });



}

getTeacherData(accessToken:string) :Promise<any> {
  return new Promise((resolve, reject )=>{

    
    const yourConfig = {
      headers: {
         Authorization: accessToken
      }
   }
    axios.get('http://localhost:8888/api/teachers/getTeacher', yourConfig)
    .then((response) => {
      if(response.data =="no teacher with email" || response.data == "Email doesn't exist"){
      }else{
        
        const jsonUser = JSON.stringify(response.data)
        console.log(jsonUser, "   : teacher data response")
        
        localStorage.setItem('teacher',jsonUser)
        resolve(response)
  
      }
  })
  .catch((error) => {
      // Error 😨
      if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
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
  });
}

getUserData(accessToken:string) :Promise<any> {
  return new Promise((resolve, reject )=>{

    console.log("hiadsfasdfasdfaswdfsdfaaaaaaaaaaaaaaaaaaa")
    const yourConfig = {
      headers: {
         Authorization: accessToken
      }
   }
    axios.get('http://localhost:8888/api/students/getOneStudent', yourConfig)
    .then((response) => {
      if(response.data =="failed password" || response.data == "Email doesn't exist"){
      }else{
        
        const jsonUser = JSON.stringify(response.data)
        console.log(jsonUser, "   : user data response")
        
        localStorage.setItem('user',jsonUser)
        resolve(response)
  
      }
  })
  .catch((error) => {
      // Error 😨
      if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
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
  });
}
}
