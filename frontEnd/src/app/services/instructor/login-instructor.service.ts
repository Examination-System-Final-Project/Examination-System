import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AuthenticateInstructorService } from './authenticate-instructor.service';
import { instructor } from 'src/app/models/instructor';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginInstructorService {
  helper = new JwtHelperService();
  instructor : instructor = {
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1 
  }
  constructor(private _login : AuthenticateInstructorService) { }
  login(data:any)
  {
     return this._login.authenticateLogin(data).pipe(
      map((response:any)=>{
        const decodedToken = this.helper.decodeToken(response.token)
        this.instructor.firstName=decodedToken.firstName
        this.instructor.email=decodedToken.email
        console.log(response.token)
        // this._isLoggedIn$.next(true);
      localStorage.setItem('tokenInstructor',response.token)
      })
    )
  }
  loggedIn() : boolean 
  {
    const token = localStorage.getItem('tokenInstructor')! 
    return !this.helper.isTokenExpired(token)
  }
  logout()
  {
    localStorage.removeItem('tokenInstructor');
  }
  removeFromLocalStorage()
  {
    if(this.loggedIn()==false)
    {
        localStorage.removeItem('tokenInstructor');
    }
  }
}
