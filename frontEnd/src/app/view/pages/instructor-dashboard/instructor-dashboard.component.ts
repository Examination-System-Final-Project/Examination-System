import { Component, OnInit } from '@angular/core';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { QuestionbankService } from 'src/app/services/questionbank/questionbank.service';
import { CreateInstructorService} from 'src/app/services/instructor/create-instructor.service'
import { GroupsService } from 'src/app/services/groups/groups.service'
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  listQuestionBanks : any
  listExams : any
  listGroups : any
  helper = new JwtHelperService();
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  constructor(public nav:NavBarServiceService,
    private questionbank : QuestionbankService,
    private exams : CreateInstructorService,
    private groups : GroupsService ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
    this.questionbank.loaddes( this.instructor.id).subscribe((res : any)=>{
      this.listQuestionBanks=res.questionBanks;
      console.log(this.listQuestionBanks)
    })
    this.exams.listExams( this.instructor.id).subscribe((res:any)=>{
      this.listExams=res.InstructorExams
      console.log(this.listExams)
    })
    this.groups.listgroups( this.instructor.id).subscribe((res:any)=>{
      this.listGroups=res.groups
      console.log(this.listGroups)
    })
    this.nav.hide();
  }
}
