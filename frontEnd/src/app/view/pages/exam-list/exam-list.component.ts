import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
import { CreateInstructorService } from 'src/app/services/instructor/create-instructor.service';
import { EditExamComponent } from '../edit-exam/edit-exam.component';
import { StudentsListComponent } from '../students-list/students-list.component';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
    dates! : string[]
    dates2! : string[]
  constructor(private _listExams:CreateInstructorService,
    private _exam:CreateExamService,
    public dialog : MatDialog) { }
  desdata:any =[] ;
  helper = new JwtHelperService();
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  ngOnInit(): void {
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
    this._listExams.listExams(this.instructor.id).subscribe ((result:any) => {
      this.desdata=result.InstructorExams;
      this.dates2= new Array(this.desdata.length)
      this.dates= new Array(this.desdata.length)
      for(let i =0;i<this.dates.length;i++)
      {
        this.dates[i]=this.desdata[i].StartTime.replace(/T/,' ').replace(/Z/,' ').replace(/\..+/, '') 
        this.desdata[i].StartTime=this.dates[i]
      }  
      for(let i =0;i<this.dates.length;i++)
      {
        this.dates2[i]=this.desdata[i].EndTime.replace(/T/,' ').replace(/Z/,' ').replace(/\..+/, '') 
        this.desdata[i].EndTime=this.dates2[i]
      }
      console.log(this.dates)
      console.log(this.desdata) ;
   })
  }
deleteExam(id:any){
  this._listExams.deleteExam(id).subscribe((res)=>{
    this.ngOnInit();
    console.log(res);
  },err=>
  {
    console.log(err);
  })
}
openDialog()
{ const dialogConfig= new MatDialogConfig();

  dialogConfig.width="60%";
  this.dialog.open(EditExamComponent,dialogConfig)
}
sendID(id:any){
  this._exam.examIdForEdit=id
}
}
