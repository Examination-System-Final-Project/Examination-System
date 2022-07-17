import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { LoginExamineeService } from 'src/app/services/examinee/login-examinee.service';
import { LoginInstructorService } from 'src/app/services/instructor/login-instructor.service';
import { instructor } from 'src/app/models/instructor';

@Component({
  selector: 'app-instructor-dashboard-navigation',
  templateUrl: './instructor-dashboard-navigation.component.html',
  styleUrls: ['./instructor-dashboard-navigation.component.css']
})
export class InstructorDashboardNavigationComponent implements OnInit {
  showMe:boolean=true
  toggle(){
    this.showMe=!this.showMe
  } 
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  helper = new JwtHelperService();
  constructor(public nav : NavBarServiceService,
    public auth : LoginInstructorService  ) {}
    
  ngOnInit(): void {
    this.nav.show()
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.firstName=decodedToken.firstName
  }
  logout()
  {
     this.auth.logout()
  }
}
