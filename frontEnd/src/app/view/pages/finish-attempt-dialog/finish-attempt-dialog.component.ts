import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamineeExamService } from 'src/app/services/examinee/examinee-exam.service';
@Component({
  selector: 'app-finish-attempt-dialog',
  templateUrl: './finish-attempt-dialog.component.html',
  styleUrls: ['./finish-attempt-dialog.component.css']
})
export class FinishAttemptDialogComponent implements OnInit {

  constructor(public router : Router,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef : MatDialogRef<FinishAttemptDialogComponent>,
     flag : ExamineeExamService
    ) { }

  ngOnInit(): void {
  }
  // navigateToEvaluation()
  // {
  //    this.router.navigate(['studentDashboard'],this.data.examineeid,this.data.exam)
  // }
  onClose()
  {
    this.dialogRef.close()
  }
  navigate()
  {
    setTimeout(()=>{
      this.router.navigate(['resultPage',this.data.examId,this.data.examineeid])
    },10000)
    
  }
}
