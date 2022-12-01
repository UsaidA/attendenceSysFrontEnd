import { Component, OnInit } from '@angular/core';
import {Registration, singletonAuth} from "../../classes"

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  LogOut(){
    //const auth = singletonAuth.getInstance("");
    singletonAuth.logOut();

  }

}
