import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { PreviewQuestionBankComponent } from '../preview-question-bank/preview-question-bank.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-choose-form',
  templateUrl: './edit-choose-form.component.html',
  styleUrls: ['./edit-choose-form.component.css']
})
export class EditChooseFormComponent implements OnInit {
  number=2
  editForm=new UntypedFormGroup({
    questionType:new UntypedFormControl(''),
    questionDifficulty:new UntypedFormControl(''),
    questionTitle:new UntypedFormControl(''),
    questionWeight:new UntypedFormControl(''),
    Answer_1:new UntypedFormControl(''),
    Answer_2:new UntypedFormControl(''),
    Answer_3:new UntypedFormControl(''),
    Answer_4:new UntypedFormControl(''),
    Answer_5:new UntypedFormControl(''),
    Answer_6:new UntypedFormControl(''),
correctAnswer:new UntypedFormControl(''), 
  });
  prefilledInputs:any =[] ;  // editForm!: FormGroup;
  // defaultValue:String="mcq"
  constructor(private formBuilder : UntypedFormBuilder,
    private questionService : QuestionsService,
    public dialogRef : MatDialogRef<EditChooseFormComponent>) { }
    
  ngOnInit(): void {
    console.log(this.questionService.questionID)
   this.questionService.getQuestionOfID(this.questionService.questionID).subscribe((result:any)=>{
    console.log(result)
     this.prefilledInputs=result
     this.checkEmpty()
     console.log(this.number)
     this.editForm=new UntypedFormGroup({
      questionType:new UntypedFormControl(this.prefilledInputs[0][0].QuestionType),
      questionDifficulty:new UntypedFormControl(this.prefilledInputs[0][0].QuestionDifficulty),
      questionTitle:new UntypedFormControl(this.prefilledInputs[0][0].QuestionTitle),
     questionWeight:new UntypedFormControl(this.prefilledInputs[0][0].QuestionWeight),
      Answer_1:new UntypedFormControl(this.prefilledInputs[0][0].Option_1),
      Answer_2:new UntypedFormControl(this.prefilledInputs[0][0].Option_2),
     Answer_3:new UntypedFormControl(this.prefilledInputs[0][0].Option_3),
     Answer_4:new UntypedFormControl(this.prefilledInputs[0][0].Option_4),
     Answer_5:new UntypedFormControl(this.prefilledInputs[0][0].Option_5),
    Answer_6:new UntypedFormControl(this.prefilledInputs[0][0].Option_6),
correctAnswer:new UntypedFormControl(this.prefilledInputs[0][0].CorrectAnswer), 
  });
   })
     
  }
 editQuestion()
 {
     this.questionService.editQuestion(this.questionService.questionID,this.editForm.value).subscribe((res)=>{
      console.log(res)
    },err=>
    {
      console.log(err)
    })
    this.onClose()
}
checkEmpty(){
  if(this.prefilledInputs[0][0].Option_3!='undefined'){
this.number++ ;
  }
  if(this.prefilledInputs[0][0].Option_4!='undefined'){
    this.number++ ;
      }
      if(this.prefilledInputs[0][0].Option_5!='undefined'){
        this.number++ ;
          }
          if(this.prefilledInputs[0][0].Option_6!='undefined'){
            this.number++ ;
              }
}
 onClose()
{
  this.dialogRef.close()
}

}
