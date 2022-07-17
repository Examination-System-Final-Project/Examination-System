import { Component, OnInit } from '@angular/core';
import { LoginExamineeService } from 'src/app/services/examinee/login-examinee.service';
import { student } from 'src/app/models/student';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FooterService } from 'src/app/services/core/footer.service';
@Component({
  selector: 'app-student-dashboard-navigation',
  templateUrl: './student-dashboard-navigation.component.html',
  styleUrls: ['./student-dashboard-navigation.component.css']
})
export class StudentDashboardNavigationComponent implements OnInit {
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
    private logoutexaminee : LoginExamineeService,
    private footer : FooterService) { }
   
  ngOnInit(): void {
    this.footer.hide()
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.examinee.firstName=decodedToken.firstName
    this.examinee.lastName=decodedToken.lastName
  }
  logoutExaminee()
  {
    this.logoutexaminee.logout()
  }
}
