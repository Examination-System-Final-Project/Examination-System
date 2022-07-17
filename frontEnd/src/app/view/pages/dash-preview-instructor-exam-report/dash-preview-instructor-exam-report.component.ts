import { Component, OnInit } from '@angular/core';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { LoginInstructorService } from 'src/app/services/instructor/login-instructor.service';

@Component({
  selector: 'app-dash-preview-instructor-exam-report',
  templateUrl: './dash-preview-instructor-exam-report.component.html',
  styleUrls: ['./dash-preview-instructor-exam-report.component.css']
})
export class DashPreviewInstructorExamReportComponent implements OnInit {

 
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
