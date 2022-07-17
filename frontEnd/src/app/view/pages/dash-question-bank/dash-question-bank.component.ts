import { Component, OnInit } from '@angular/core';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { LoginInstructorService } from 'src/app/services/instructor/login-instructor.service';

@Component({
  selector: 'app-dash-question-bank',
  templateUrl: './dash-question-bank.component.html',
  styleUrls: ['./dash-question-bank.component.css']
})
export class DashQuestionBankComponent implements OnInit {
  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  } 
  constructor(public nav : NavBarServiceService,
      private logout: LoginInstructorService) { }

  ngOnInit(): void {
    this.nav.hide()
  }
  logoutInstructor()
  {
    this.logout.logout()
  }
}
