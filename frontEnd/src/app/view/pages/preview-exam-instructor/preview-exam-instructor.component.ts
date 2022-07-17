import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/examinee/reports.service';

@Component({
  selector: 'app-preview-exam-instructor',
  templateUrl: './preview-exam-instructor.component.html',
  styleUrls: ['./preview-exam-instructor.component.css']
})
export class PreviewExamInstructorComponent implements OnInit {

  constructor(private _reports:ReportsService,
    public router:ActivatedRoute,) { }
    public examId=this.router.snapshot.paramMap.get('id')
    desdata:any=[]
  ngOnInit(): void {
    this._reports.getExamQuestion(this.examId,this._reports.examnieeId).subscribe ((result:any) => {
      this.desdata=result.examineeAnswersEvaluation;
      console.log(this.desdata) ;
   })
  }

}
