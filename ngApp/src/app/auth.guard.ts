import { Injectable } from '@angular/core';
//import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
	constructor(private userService:UserService,
				private router:Router){}

	canActivate():boolean{
		if(this.userService.loggedIn()){
			return true
		}else{
			this.router.navigate(['/login'])
			return false
		}
	}  
}
