import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  getData(){
    let url = "http://localhost:8888/api/login";
    return this.http.get(url);
  }
}
