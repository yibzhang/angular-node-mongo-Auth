import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //registerUserInfo:User;
  registerForm:FormGroup;
  isSubmitted:boolean;
  
  errorResponseMessage:string;  
  errorResponseCode:number;

  constructor(private userService:UserService,
              private router:Router,
              private formBuilder:FormBuilder) {
    //this.registerUserInfo = new User();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email           : ['',[Validators.required, Validators.email]],
      password        : ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword : ['',Validators.required]
    },{
      validator : MustMatch('password', 'confirmPassword')
    });
  }

  get f() {return this.registerForm.controls;}

  registerUser(){
    this.isSubmitted = true;
    if(this.registerForm.invalid){return;}
    //console.log(this.registerForm.value);
  	this.userService.registerUser({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }).subscribe(
  		res=>{
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUserEmail', res.email);
        this.router.navigate(['/userDetail']);
      },
  		err=>{
        console.log(err);      
        this.errorResponseCode = err.status;
        this.errorResponseMessage = err.error;
        this.registerForm.controls["email"].setErrors({errorResponse:true});
      }
  		)
  }
}
