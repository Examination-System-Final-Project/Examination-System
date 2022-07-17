import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { student } from 'src/app/models/student';
import { ListExamService } from 'src/app/services/exam/list-exam.service';
import { exam } from 'src/app/models/exam';
import { ExamineeExamService } from 'src/app/services/examinee/examinee-exam.service';
import { DatePipe } from '@angular/common';
providers: [DatePipe]
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
  dates2! : string[]
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
  time = new Date()
  time2 = new Date()
  examTime : any
  examStartTime! : Date [] 
  examEndTime! : Date []  
  constructor(private student : ListExamService,
    private examineeExam:ExamineeExamService,
    public datepipe : DatePipe) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.examinee.id= decodedToken.id
    this.condition = decodedToken.examineeCondition
    this.student.listExamineeExams(this.examinee.id).subscribe((result:any)=>{
      this.exam=result.exams
     console.log(this.time)
      
      // this.datepipe.transform(this.time,"yyyy-MM-dd HH:mm:ss")
      // // this.time2.getHours()
      // console.log(this.datepipe.transform(this.time,"yyyy-MM-dd HH:mm:ss"))
      // for(let i =0; i<this.exam.length;i++)
      // {
        
      //   this.examEndTime[i] = this.exam[i].EndTime
        
      // }
      // let x  =  Date.parse(this.exam.StartTime)
      // console.log(x)
      if(this.exam.length>0)
      { 
        this.dates= new Array(this.exam.length)
        this.dates2= new Array(this.exam.length)
        this.examStartTime = new Array(this.exam.length)
        this.examEndTime = new Array(this.exam.length)
        for(let i =0;i<this.dates.length;i++)
        {
          this.dates[i]=this.exam[i].StartTime.replace(/T/,' ').replace(/Z/,' ').replace(/\..+/, '')
          this.dates2[i]=this.exam[i].EndTime.replace(/T/,' ').replace(/Z/,' ').replace(/\..+/, '')
          this.exam[i].StartTime=this.dates[i]
          this.exam[i].EndTime = this.dates2[i]
          let parsedStartDate = new Date(this.exam[i].StartTime)
          let parsedEndDate = new Date(this.exam[i].EndTime)
          this.examStartTime[i]= parsedStartDate
          this.examEndTime[i]= parsedEndDate
          this.examStartTime[i].setHours(this.examStartTime[i].getHours()+2)
          this.examEndTime[i].setHours(this.examEndTime[i].getHours()+2)
        }  
        console.log(this.examStartTime)
        console.log(this.examEndTime)
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
