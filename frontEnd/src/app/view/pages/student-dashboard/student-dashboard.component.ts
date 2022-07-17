import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { student } from 'src/app/models/student';
import { ListExamService } from 'src/app/services/exam/list-exam.service';
import { exam } from 'src/app/models/exam';
import { ExamineeExamService } from 'src/app/services/examinee/examinee-exam.service';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  Exam : exam={
    Description : '',
    Duration : '',
    EndTime : '',
    ExamName : '',
    StartTime : '',
    exam_ID : 0,
    examinee_ID : 0
  }
  found : boolean = false
  
  dates! : string[]
  examinee : student = {
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId :''
  }
  condition : any
  helper = new JwtHelperService();
  exam : any
  constructor(private student : ListExamService,
    private examineeExam:ExamineeExamService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.examinee.id= decodedToken.id
    this.condition = decodedToken.examineeCondition
    this.student.listExamineeExams(this.examinee.id).subscribe((result:any)=>{
      this.exam=result.exams
      if(this.exam.length>0)
      { 
        this.dates= new Array(this.exam.length)
        for(let i =0;i<this.dates.length;i++)
        {
          this.dates[i]=this.exam[i].StartTime.replace(/T/,' ').replace(/Z/,' ').replace(/\..+/, '') 
          this.exam[i].StartTime=this.dates[i]
        }  
        console.log(result);
        this.found=true;
      }else{
        this.found=false;
      }
     
    })
  }
  sendDuration(duration:any)
  {
    this.examineeExam.Duration=duration
    console.log(duration)
  }
 

}
