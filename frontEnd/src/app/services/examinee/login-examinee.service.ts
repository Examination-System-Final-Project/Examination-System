import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AuthenticateExamineeService } from './authenticate-examinee.service';
import { student } from 'src/app/models/student';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginExamineeService {
// private  _isLoggedIn$= new BehaviorSubject<boolean>(false)
// isLoggedIn$ = this._isLoggedIn$.asObservable()
helper = new JwtHelperService();
fruits! : string[]
examinee : student = {
  id : '',
  firstName : '',
  lastName : '',    
  email : '',
  organizationId :''
}
test : any
  constructor(private _login : AuthenticateExamineeService) {
    // const token = localStorage.getItem('token')
    // this._isLoggedIn$.next(!!token);
   }
  login(data:any)
  {
    return this._login.authenticate(data).pipe(
      map((response:any)=>{
        const decodedToken = this.helper.decodeToken(response.token)
        this.examinee.firstName=decodedToken.firstName
        this.examinee.email=decodedToken.email
        console.log(response.token)
        // this._isLoggedIn$.next(true);
      localStorage.setItem('token',response.token)
      })
    )
  }
  loggedIn() : boolean 
  {
    const token = localStorage.getItem('token')! 
    return !this.helper.isTokenExpired(token)
  }
  logout()
  {
    localStorage.removeItem('token');
  }
  removeFromLocalStorage()
  {
    if(this.loggedIn()==false)
    {
        localStorage.removeItem('token');
    }
  }
}

