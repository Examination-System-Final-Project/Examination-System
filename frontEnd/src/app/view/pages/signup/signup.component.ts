import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginExamineeService } from 'src/app/services/examinee/login-examinee.service';
import { LoginInstructorService } from 'src/app/services/instructor/login-instructor.service';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginform!: UntypedFormGroup
  type:any
  constructor(private formBuilder: UntypedFormBuilder, private http: HttpClient, private router: Router, private _login: LoginExamineeService, private instructorLogin : LoginInstructorService, public nav : NavBarServiceService) { }

  ngOnInit(): void {
    this.nav.show()
    this.loginform = this.formBuilder.group({
      email: new UntypedFormControl(''),
      password: new UntypedFormControl('')
    })
  }
  login() {
    if(this.type="student")
  {
    this._login.login(this.loginform.value).subscribe((result) => {

      console.log(result)
      this.router.navigate(['studentDashboard'])
      
    }, err => {
      console.log(err)
    })
  }
  if(this.type="instructor")
  {
    this.instructorLogin.login(this.loginform.value).subscribe((result) => {

      console.log(result)
      this.router.navigate(['instructorDashboard'])
      
    }, err => {
      console.log(err)
    })
  }
}

}
