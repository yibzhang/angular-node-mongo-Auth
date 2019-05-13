import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserInfo:User;
  
  constructor(private userService:UserService,
              private router:Router) {
    this.registerUserInfo = new User();
  }

  ngOnInit() {
  }

  registerUser(){
  	this.userService.registerUser(this.registerUserInfo).subscribe(
  		res=>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/userDetail']);
      },
  		err=>console.log(err)
  		)
  }
}
