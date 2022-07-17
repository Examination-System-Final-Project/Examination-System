import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { LoginInstructorService } from 'src/app/services/instructor/login-instructor.service';

@Component({
  selector: 'app-dash-instructor-reports',
  templateUrl: './dash-instructor-reports.component.html',
  styleUrls: ['./dash-instructor-reports.component.css']
})
export class DashInstructorReportsComponent implements OnInit {

  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  } 
  constructor(public nav : NavBarServiceService,
    private logout : LoginInstructorService) { }

  ngOnInit(): void {
    this.nav.hide()
  }
  logoutInstructor()
  {
    this.logout.logout()
  }
}
