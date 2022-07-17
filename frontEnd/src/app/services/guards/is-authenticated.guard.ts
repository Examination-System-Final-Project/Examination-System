import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginExamineeService } from '../examinee/login-examinee.service';
import { LoginInstructorService } from '../instructor/login-instructor.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private authStudent : LoginExamineeService,public router :Router, private authInstructor : LoginInstructorService){}
  canActivate() : boolean
  {
     if (this.authStudent.loggedIn()==false)
     {
       this.router.navigate(['signin'])
       localStorage.removeItem('token')
       return false 
     }
     else
     {
       return true 
     }
    
  }
  
  
}
