import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExamineeExamService } from 'src/app/services/examinee/examinee-exam.service';
// import { FinishAttemptDialogComponent } from '../finish-attempt-dialog/finish-attempt-dialog.component';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
gradeInfo:any
  constructor(private evaluationStats : ExamineeExamService,
    public route : ActivatedRoute,
    ) { }
  public examID = this.route.snapshot.paramMap.get('id')
  public examineeID = this.route.snapshot.paramMap.get('id2')
  ngOnInit(): void {
    this.evaluationStats.evaluationStats(this.examID,this.examineeID).subscribe((res:any)=>{
    this.gradeInfo=res.examEvaluationStats
    console.log(this.gradeInfo)
    },err=>{
      console.log(err)
    })
    // this.dialogref.close()
  }

}
