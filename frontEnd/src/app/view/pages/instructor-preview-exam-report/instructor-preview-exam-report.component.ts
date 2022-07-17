import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
import { ReportsService } from 'src/app/services/examinee/reports.service';

@Component({
  selector: 'app-instructor-preview-exam-report',
  templateUrl: './instructor-preview-exam-report.component.html',
  styleUrls: ['./instructor-preview-exam-report.component.css']
})
export class InstructorPreviewExamReportComponent implements OnInit {
  desdata:any=[]
  id:any
  helper = new JwtHelperService();
  constructor( public router:ActivatedRoute,
    private _reports:ReportsService)
     { }
     instructor : instructor = { 
      id : '',
      firstName : '',
      lastName : '',    
      email : '',
      organizationId : 1
    }
  public examID=this.router.snapshot.paramMap.get('id')
  ngOnInit(): void {
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
 
    this._reports.previewExamReport(this.examID,this.instructor.id).subscribe ((result:any) => {
      this.desdata=result.examEvaluationStats;
      console.log(this.desdata) ;
      
   })
}
sendExamnieeId(id:any){
  this._reports.examnieeId=id
}}
