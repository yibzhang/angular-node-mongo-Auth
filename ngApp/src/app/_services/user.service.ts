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
  private _registerUrl = "http://localhost:3000/api/register";

  constructor(private http:HttpClient) { }

  ngOnInit(){}

  registerUser(user:User){
  	return this.http.post<any>(this._registerUrl, user, httpOptions);
  }

}
