import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { PreviewQuestionBankComponent } from '../preview-question-bank/preview-question-bank.component';
@Component({
  selector: 'app-true-false-form',
  templateUrl: './true-false-form.component.html',
  styleUrls: ['./true-false-form.component.css']
})
export class TrueFalseFormComponent implements OnInit {
  defaultValue:String="true or false"
  questionID :any
  QBID:any
    constructor(private formBuilder : UntypedFormBuilder,
    private TF : QuestionsService,
    private _create :CreateExamService) { }
  trueFalseForm!: UntypedFormGroup
  ngOnInit(): void {
    this.trueFalseForm=this.formBuilder.group({
      questionType:new UntypedFormControl(''),
      questionDifficulty:new UntypedFormControl(''),
      questionTitle:new UntypedFormControl(''),
      questionWeight:new UntypedFormControl(''),
      Answer_1:new UntypedFormControl(''),
      correctAnswer:new UntypedFormControl(''),
    })
   
  }
  recieveQBID()
  {
    this.QBID=this.TF.questionBankID();
    return this.QBID;
  }
  createTrueFalse()
  {
    if (this.trueFalseForm.controls['correctAnswer'].value=="True"){
      this.trueFalseForm.controls['Answer_1'].setValue("False");   
    }
else{
  this.trueFalseForm.controls['Answer_1'].setValue("True");  
}
    this.TF.createTF(this.trueFalseForm.value,this.recieveQBID()).subscribe((res:any)=>{
      
      console.log(res);
      this.questionID=res.questionId
      console.log(this.questionID)
      this.generateAudio()
    },err=>
    {
      console.log(err);
    })
  }
  generateAudio(){
    this._create.generateAudioFiles(this.questionID).subscribe((result:any)=>
  
    {
      
      console.log("done creating audio files") 
    })
  }
}
