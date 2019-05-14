import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _rootUrl     = "http://localhost:3000/api/";
  private _registerUrl = this._rootUrl + "register";
  private _loginUrl    = this._rootUrl + "login";

  constructor(private http:HttpClient) { }

  ngOnInit(){}

  registerUser(user:User){
  	return this.http.post<any>(this._registerUrl, user, httpOptions);
  }

  loginUser(user:User){
  	return this.http.post<any>(this._loginUrl, user, httpOptions);
  }

  logOutUser(){
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
