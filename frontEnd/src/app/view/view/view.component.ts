import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
visible:Boolean=false
  constructor() { }

  ngOnInit(): void {
  }
  // hideNavBar() : Boolean
  // {
  //   if(this.router.url=="/instructorDashboard" || this.router.url=="/homeinstructor" || this.router.url=="/dashboardQuestionbank" ||  this.router.url=="/dashboardQuestions" || this.router.url=="/dashboardExams" || this.router.url=="/dashpreviewQuestionBank"  )
  //   {
  //     return this.visible=false
  //   }
  //   else{
  //    return this.visible=true;
  //   }
  //   }
}
