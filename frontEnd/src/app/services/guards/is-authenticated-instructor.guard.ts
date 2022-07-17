import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginInstructorService } from '../instructor/login-instructor.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedInstructorGuard implements CanActivate {
  constructor(private authInstructor : LoginInstructorService, public router :Router){}
  canActivate() : boolean
  {
     if (this.authInstructor.loggedIn()==false)
     {
       this.router.navigate(['signin'])
       localStorage.removeItem('tokenInstructor')
       return false 
     }
     else
     {
       return true 
     }
    
  }
  
}
