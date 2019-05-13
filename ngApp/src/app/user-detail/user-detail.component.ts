import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user'; 

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  currentUserInfo:User;	
  test='test';

  constructor() {
    this.currentUserInfo = new User();
  }

  ngOnInit() {
  	this.getCurrentUser();
  }

  getCurrentUser(){  	
  	this.currentUserInfo.email = localStorage.getItem("currentUserEmail");
  	console.log(this.currentUserInfo.email)
  }

}
