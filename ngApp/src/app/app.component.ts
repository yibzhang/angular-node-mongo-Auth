import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'auth';
  //private loggedIn:boolean;

  constructor(private userService:UserService,
  			  private router:Router){}
  ngOnInit(){
  	if(this.userService.isLoggedIn()){this.router.navigate(["/userDetail"]);}
	//this.loggedIn = this.userService.loggedIn();
  }

  isLoggedIn(){
  	return this.userService.isLoggedIn();
  }

  logOutUser(){
  	this.userService.logOutUser();
  	//this.router.navigate(['/login']);
  }
}
