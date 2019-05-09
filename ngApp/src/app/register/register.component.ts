import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserInfo = {};
  
  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  registerUser(){
  	this.userService.registerUser(this.registerUserInfo).subscribe(
  		res=>console.log(res),
  		err=>console.log(err)
  		)
  }
}
