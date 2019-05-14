import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserInfo:User;

  constructor(private userService: UserService,
              private router: Router) { 
    this.loginUserInfo = new User();
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()) this.router.navigate(['/userDetail']);
  }

  loginUser(){
  	this.userService.loginUser(this.loginUserInfo).subscribe(
  		res => {
  			console.log(res);
  			localStorage.setItem("token", res.token);
        localStorage.setItem("currentUserEmail", res.email);
        this.router.navigate(["./userDetail"]);
  		},
  		err => console.log(err)  		
  		);
  }
}
