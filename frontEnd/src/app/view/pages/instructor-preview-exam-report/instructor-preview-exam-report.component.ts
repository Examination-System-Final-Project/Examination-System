import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/examinee/reports.service';

@Component({
  selector: 'app-instructor-preview-exam-report',
  templateUrl: './instructor-preview-exam-report.component.html',
  styleUrls: ['./instructor-preview-exam-report.component.css']
})
export class InstructorPreviewExamReportComponent implements OnInit {
  desdata:any=[]
  constructor( public router:ActivatedRoute,
    private _reports:ReportsService)
     { }

  public examID=this.router.snapshot.paramMap.get('id')
  ngOnInit(): void {
    this._reports.previewExamReport(this.examID).subscribe ((result:any) => {
      this.desdata=result.examEvaluationStats;
      console.log(this.desdata) ;
      
   })
}}
