import { Component, OnInit } from '@angular/core';
import { LoginExamineeService } from 'src/app/services/examinee/login-examinee.service';
import { student } from 'src/app/models/student';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dash-profile-settings',
  templateUrl: './dash-profile-settings.component.html',
  styleUrls: ['./dash-profile-settings.component.css']
})
export class DashProfileSettingsComponent implements OnInit {

  showMe:boolean=true
  examinee : student = {
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId :''
  }
  helper = new JwtHelperService();
  toggle(){

    this.showMe=!this.showMe
  } 
  constructor(public auth:LoginExamineeService,
    private logoutexaminee : LoginExamineeService) { }
   
  ngOnInit(): void {
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.examinee.firstName=decodedToken.firstName
  }
  logoutExaminee()
  {
    this.logoutexaminee.logout()
  }
}
