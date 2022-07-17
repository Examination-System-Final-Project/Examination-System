import { Component, OnInit } from '@angular/core';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { LoginInstructorService } from 'src/app/services/instructor/login-instructor.service';

@Component({
  selector: 'app-dash-exams',
  templateUrl: './dash-exams.component.html',
  styleUrls: ['./dash-exams.component.css']
})
export class DashExamsComponent implements OnInit {
  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  } 
  constructor(public nav : NavBarServiceService,
    private logout : LoginInstructorService) { }

  ngOnInit(): void {
    this.nav.hide();
  }
logoutInstructor()
{
  this.logout.logout()
}
}
