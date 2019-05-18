import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../_models/user';

var httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _rootUrl     = "http://localhost:3000/api/";

  private _registerUrl = this._rootUrl + "register";
  private _loginUrl    = this._rootUrl + "login";

  private _userUrl     = this._rootUrl + "user";

  constructor(private http:HttpClient,
              private router:Router) { }

  ngOnInit(){}

  // register, login, logout
  registerUser(user:User){
  	return this.http.post<any>(this._registerUrl, user, httpOptions);
  }

  loginUser(user:User){
  	return this.http.post<any>(this._loginUrl, user, httpOptions);
  }

  logOutUser(){
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  // user: update, delete
  updateUser(user:User){
    //console.log("put user info to backend");
    return this.http.put<any>(this._userUrl, user, httpOptions);
  }

  deleteUser(){
    return this.http.delete<any>(this._userUrl, httpOptions);
  }


  // helper function
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
