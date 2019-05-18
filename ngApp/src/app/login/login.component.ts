import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //loginUserInfo:User;
  loginForm: FormGroup;
  isSubmitted: boolean;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) { 
    //this.loginUserInfo = new User();
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()) this.router.navigate(['/userDetail']);
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  loginUser(){
    this.isSubmitted = true;    
  	if(this.loginForm.invalid){return;}
    //console.log(this.loginForm.value)
    
    this.userService.loginUser(this.loginForm.value).subscribe(
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
