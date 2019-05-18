import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user'; 
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  currentUserInfo:User;
  editMode:boolean = false;

  constructor(private userService:UserService) {
    this.currentUserInfo = new User();
  }

  ngOnInit() {
  	this.getCurrentUser();
  }

  getCurrentUser(){  	
  	this.currentUserInfo.email = localStorage.getItem("currentUserEmail");
  	//console.log(this.currentUserInfo.email)
  }

  updateUser(){    
    localStorage.setItem("currentUserEmail", this.currentUserInfo.email);
    this.userService.updateUser(this.currentUserInfo).subscribe(
      res=>console.log(res),
      err=>console.log(err)
      );
    this.editMode = false;
    //console.log("Change to edit mode");
  }

  deleteUser(){
    this.userService.deleteUser().subscribe(
      res=>console.log(res),
      err=>console.log(err)
      );
    this.userService.logOutUser();
  }

  isEditMode(){
    this.editMode = true;
    //console.log("Change to userdetail mode");
  }

}
