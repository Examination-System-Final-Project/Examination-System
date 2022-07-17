import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-true-false-form',
  templateUrl: './edit-true-false-form.component.html',
  styleUrls: ['./edit-true-false-form.component.css']
})
export class EditTrueFalseFormComponent implements OnInit {
  trueFalseForm=new UntypedFormGroup({
    questionType:new UntypedFormControl(''),
      questionDifficulty:new UntypedFormControl(''),
      questionTitle:new UntypedFormControl(''),
      questionWeight:new UntypedFormControl(''),
      Answer_1:new UntypedFormControl(''),
      correctAnswer:new UntypedFormControl(''),
  })
  QBID:any
  prefilledInputs:any =[] ;

  constructor( private questionService : QuestionsService,
    public dialogRef : MatDialogRef<EditTrueFalseFormComponent>) { }

  ngOnInit(): void {
    console.log(this.questionService.questionID)
    this.questionService.getQuestionOfID(this.questionService.questionID).subscribe((result:any)=>{
      this.prefilledInputs=result
      this.trueFalseForm=new UntypedFormGroup({
        questionDifficulty:new UntypedFormControl(this.prefilledInputs[0][0].QuestionDifficulty),
        questionTitle:new UntypedFormControl(this.prefilledInputs[0][0].QuestionTitle),
       questionWeight:new UntypedFormControl(this.prefilledInputs[0][0].QuestionWeight),
        Answer_1:new UntypedFormControl(this.prefilledInputs[0][0].Option_1),
        correctAnswer:new UntypedFormControl(this.prefilledInputs[0][0].CorrectAnswer), 
  })

    });
  }
  editQuestion()
 {
     this.questionService.editQuestion(this.questionService.questionID,this.trueFalseForm.value).subscribe((res)=>{
      console.log(res)
    },err=>
    {
      console.log(err)
    })
     this.onClose()
 }
 onClose()
{
  this.dialogRef.close()
}
}
