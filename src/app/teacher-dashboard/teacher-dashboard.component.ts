import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attendence, singletonAuth, Groups, Teacher } from 'src/classes';
import { sendAttendenceData } from 'src/services';


@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  firstName = "";
  lastName = "";
  email = "";
  academicAdvisor= "";
  courseName = ""; 
  temp= "";
  attendCode = "";
  public aData: Attendence[] =[];
  public groupData: Groups[] = [];
 
  dtOptions: DataTables.Settings= {};

  constructor(public router :Router) { }

  ngOnInit(): void {

    this.getAttendenceData();
    
    this.getAttendCode();

    this.getGroupPercentages();
    this.getTeacherData();

    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 25],
      processing: true
    };
  }

  getAttendCode(){
    
    if(localStorage.getItem('attendCode') === null){
      console.log("local storage has no attend code")
    }else{
      
      // let attendCodeStored: string = JSON.parse(localStorage.getItem('attendCode') || '{}');
      // this.attendCode = attendCodeStored[0];
      // console.log(attendCodeStored, " : attendCode from storage")
      // console.log(this.attendCode, "  : this attend Code")

      var jsonString = localStorage.getItem('attendCode') || '{}'
      
      //var newString = jsonString.substring(1, jsonString.length-1);
      console.log("hi", jsonString)
      console.log(JSON.parse(jsonString))
      const obj = JSON.parse(jsonString)
      
      this.attendCode = obj.attendCode;
      console.log(obj.attendCode)
    }
   

  }

  getGroupPercentages(){
    if(localStorage.getItem('groupPercentages') === null){
      console.log("local storage has no percentages")
    }else{
      let attendenceFromStorage: Groups[] = JSON.parse(localStorage.getItem('groupPercentages') || '{}');
      this.groupData = attendenceFromStorage
      console.log(attendenceFromStorage, " :attendencefromstorage")
      console.log(this.groupData, "  : this.groupData")

    }
  }
  getTeacherData(){
    if(localStorage.getItem('teacher') === null){
      console.log("local storage has no teacher data")
    }else{
      let attendenceFromStorage: Teacher = JSON.parse(localStorage.getItem('teacher') || '{}');
     console.log(attendenceFromStorage.firstName)
      this.firstName = attendenceFromStorage.firstName;
      this.lastName = attendenceFromStorage.lastName;
      this.email = attendenceFromStorage.email;
      console.log(attendenceFromStorage, " :attendencefromstorage")
     

    }
  }

  getAttendenceData(){
    if(localStorage.getItem('allStudentAttendences') === null){
      console.log("local storage has no attendence")
    }else{
      let attendenceFromStorage: Attendence[] = JSON.parse(localStorage.getItem('allStudentAttendences') || '{}');
      this.aData = attendenceFromStorage
      console.log(attendenceFromStorage, " :attendencefromstorage")
      console.log(this.aData, "  : this.aData")

    }
  }

  checkVal(attendenceID:any, studentID: any, lectureID:any, hasAttended: any){
    console.log(attendenceID, studentID, lectureID, hasAttended);
   
    if(hasAttended === 'true'){
      console.log("has Attended true")
      hasAttended = 1
    }else if(hasAttended === 'false'){
      hasAttended = 0
    }
    var attendence = new Attendence(attendenceID, studentID, lectureID, hasAttended);
    
    console.log(attendence, ": attendence OBJ")
    var jwtToken  = localStorage.getItem('jwtToken')
    if(jwtToken == null){
      console.log("null issue in teacher dashboard")
    }else{
      console.log(jwtToken)
      sendAttendenceData(jwtToken, attendence)
    }
    console.log(jwtToken)
    
 }
  LogOut(){
    //const auth = singletonAuth.getInstance("");
    singletonAuth.logOut();
    this.router.navigate(['/']);
    this.ngOndestroy();
  }
  ngOndestroy() {
    console.log("teacher dashboard destroyed")
  }
}
