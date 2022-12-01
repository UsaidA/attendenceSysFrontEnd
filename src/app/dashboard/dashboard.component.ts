import { Component, HostListener, OnInit } from '@angular/core';
import {Attendence, singletonAuth, Student, Lectures} from "../../classes"
import { attendLecture } from 'src/services';
import { plainToClass } from "class-transformer";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstName = "";
  lastName = "";
  email = "";
  academicAdvisor= "";
  courseName = "";
  studentID = ""; 
  temp= "";

  public data:Lectures[] = [];
  public aData: Attendence[] =[];
  dtOptions: DataTables.Settings= {};


  constructor(public router :Router) {


  

   }

  ngOnInit(): void {
    console.log("test")
    this.getUserData();
    this.getLecturesData();
    this.getAttendenceData();
    this.stringToDate();
    
    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 25],
      processing: true
    };

  }

  attendLecture(attendCode:any){
    
    console.log(attendCode.value)
    // see which lecture is running from data[] array, 
    // send that lecture ID as an attend object 
    let currentTime: Date = new Date();
    console.log(currentTime)
    this.data.forEach((element, i) => {
      console.log( element.lectureStart.getTime() >= currentTime.getTime() , element.lectureID, "  : all should be greater than now ")
      console.log( element.lectureEnd.getTime() < currentTime.getTime() , element.lectureID, "  : all should be less than now ")
      if(element.lectureStart.getTime() >= currentTime.getTime() && element.lectureEnd.getTime() < currentTime.getTime()  ){
        
        let lecID = element.lectureID
        console.log(this.studentID)
        var attendObj: Attendence = new Attendence(null,this.studentID,lecID, "1" )
        console.log(attendObj)
        var jwtToken  = localStorage.getItem('jwtToken')
        if(jwtToken == null){
          console.log("null issue in teacher dashboard")
        }else{
          attendLecture(jwtToken,attendObj, attendCode.value)
        }

        
        
      }else{

      }


    })

    console.log(this.data[0].lectureEnd)
    console.log(new Date(this.data[0].lectureEnd))



  }
  stringToDate(){

    this.data.forEach((element, i) => {
      this.data[i].lectureStart = new Date(element.lectureStart)
     
      console.log(this.data[i].lectureStart)
      this.data[i].lectureEnd = new Date(element.lectureEnd)
    });

   
 
    console.log(this.data)
  }

  LogOut(){
    //const auth = singletonAuth.getInstance("");
    singletonAuth.logOut();
    this.router.navigate(['/']);
    this.ngOndestroy();
  }
  getAttendenceData(){
    if(localStorage.getItem('attendence') === null){
      console.log("local storage has no attendence")
    }else{
      let attendenceFromStorage: Attendence[] = JSON.parse(localStorage.getItem('attendence') || '{}');
      this.aData = attendenceFromStorage
      console.log(attendenceFromStorage, " :attendencefromstorage")
      console.log(this.aData, "  : this.aData")

    }
  }
  getLecturesData(){
    if(localStorage.getItem('lectures') === null){
      console.log("local storage has no lectures")
    }else{
      let lecturesFromStorage: Lectures[] = JSON.parse(localStorage.getItem('lectures') || '{}');
      this.data = lecturesFromStorage
      console.log(lecturesFromStorage, " :lecturesfromstorage")
     

      console.log(this.data, "  : this.data")

    }

  }
  getUserData(){

    if(localStorage.getItem('user') === null){
      console.log("local storage has no user")
    }else{

      //let student = plainToClass(Student, x)
      let userFromStorage: Student = JSON.parse(localStorage.getItem('user') || '{}');
      this.studentID = userFromStorage.studentID;
      this.firstName = userFromStorage.firstName;
      this.lastName = userFromStorage.lastName;
      this.email = userFromStorage.email;
      
      console.log(userFromStorage.studentID)
      console.log(this.studentID, this.firstName, this.lastName, this.email)
    }
    
  }



  ngOndestroy(){
    console.log("dashboard destroyed")
  }

}
