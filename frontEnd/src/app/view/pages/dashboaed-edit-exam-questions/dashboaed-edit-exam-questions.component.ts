import { Component, OnInit } from '@angular/core';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { LoginInstructorService } from 'src/app/services/instructor/login-instructor.service';

@Component({
  selector: 'app-dashboaed-edit-exam-questions',
  templateUrl: './dashboaed-edit-exam-questions.component.html',
  styleUrls: ['./dashboaed-edit-exam-questions.component.css']
})
export class DashboaedEditExamQuestionsComponent implements OnInit {
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
