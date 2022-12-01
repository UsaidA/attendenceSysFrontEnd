import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Registration, singletonAuth} from "../classes"


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  auth;
  constructor(){
    this.auth = singletonAuth.getInstance("");
    
  }
   

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.isLoggedIn();
  }


  
}
