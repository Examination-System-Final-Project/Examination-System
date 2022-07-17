import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.css']
})
export class CreateQuestionDialogComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<CreateQuestionDialogComponent>) { }

  ngOnInit(): void {
  }
  onClose()
  {
    this.dialogRef.close()
  }

}
