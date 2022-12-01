class Registration{
    constructor(public email: string, public password: string){
        this.email = email;
        this.password =password;
    }


    login(registered: Registration, token: string){
        const temp = JSON.stringify(registered)

        localStorage.setItem('registered', temp)
        localStorage.setItem('token', token)

    }
    
    isLoggedIn(): boolean{

        if(localStorage.getItem('token') === null){
            return false
        }else{
            return true;
        }

    }
}

class Student{

    constructor(public studentID: string, public firstName: string, public lastName:string, public email: string, public teacherID: string, public courseID: string, public dateStarted: string ){
        this.studentID = studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.teacherID= teacherID;
        this.courseID = courseID;
        this.dateStarted = dateStarted;
    }
}

class Teacher{

    constructor(public teacherID: string, public firstName: string, public lastName:string, public email: string,  public dateStarted: string ){
        this.teacherID = teacherID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateStarted = dateStarted;
    }
}

class singletonAuth{

 static _instance: singletonAuth | null = null;

 constructor(token:string){
    
    localStorage.setItem('jwtToken', token);
}

static getInstance(token:string){

    if(!singletonAuth._instance){

        singletonAuth._instance = new singletonAuth(token);
    }
    return singletonAuth._instance;

}

 isLoggedIn():boolean{

    
    if(localStorage.getItem('jwtToken') === null){
        return false
      }else{
        return true;
      }

}
static logOut(){
    this._instance= null; 
    localStorage.clear();
   
}



}

class Lectures{
    constructor(public lectureID: string, public lectureStart: Date, public lectureEnd: Date, public moduleID: string){
        this.lectureID = lectureID;
        this.lectureStart = lectureStart;
        this.lectureEnd = new Date(lectureEnd);
        this.moduleID = moduleID;
    }

}
class Attendence{
    constructor(public attendenceID: string | null, public studentID: string, public lectureID: string, public hasAttended: string){
        this.attendenceID = attendenceID;
        this.studentID = studentID;
        this.lectureID = lectureID;
        this.hasAttended = hasAttended;
    }

}
class Groups{
    constructor(public courseID:string , public groupID: string, public percentage: string){
        this.courseID = this.courseID;
        this.groupID = this.groupID;
        this.percentage = this.percentage;
    }

}

export{Registration,Student, singletonAuth, Lectures, Attendence, Groups, Teacher};