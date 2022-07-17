import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { LoginInstructorService } from 'src/app/services/instructor/login-instructor.service';

@Component({
  selector: 'app-dash-preview-question-bank',
  templateUrl: './dash-preview-question-bank.component.html',
  styleUrls: ['./dash-preview-question-bank.component.css']
})
export class DashPreviewQuestionBankComponent implements OnInit {
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  helper = new JwtHelperService();


  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  } 
  constructor(public nav : NavBarServiceService,
    private logout : LoginInstructorService) { }

  ngOnInit(): void {
    this.nav.hide()
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.firstName=decodedToken.firstName
this.instructor.lastName=decodedToken.lastName
  }
  logoutInstructor()
  {
    this.logout.logout()
  }
}
