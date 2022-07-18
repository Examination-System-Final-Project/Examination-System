import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
@Component({
  selector: 'app-essay-form',
  templateUrl: './essay-form.component.html',
  styleUrls: ['./essay-form.component.css']
})
export class EssayFormComponent implements OnInit {
  QBID:any
  questionForm!: UntypedFormGroup;
  defaultValue:string="essay"
  questionID: any;
  constructor(private formBuilder : UntypedFormBuilder,
    private createQuestion : QuestionsService,
    public dialogRef : MatDialogRef<EssayFormComponent>,
    private _create :CreateExamService) { }

  ngOnInit(): void {
    this.questionForm=this.formBuilder.group({
      questionType:new UntypedFormControl(''),
      questionDifficulty:new UntypedFormControl(''),
      questionTitle:new UntypedFormControl(''),
      questionWeight:new UntypedFormControl(''),
      correctAnswer:new UntypedFormControl(''), 
    });
  }
  recieveQBID()
  {
    this.QBID=this.createQuestion.questionBankID();
    return this.QBID;
  }
   createEssay()
   {
     this.createQuestion.createEssay(this.questionForm.value,this.recieveQBID()).subscribe((res:any)=>{
      this.questionForm.reset()
      this.questionID=res.questionId
      this.ngOnInit()
      console.log(this.questionID)
      console.log(res);
      this.generateAudio()
    },err=>{
      console.log(err)
    })
   
  }
  onClose()
{
  this.questionForm.reset()
  this.dialogRef.close()
}
generateAudio(){
  this._create.generateAudioFiles(this.questionID).subscribe((result:any)=>

  {
    
    console.log("done creating audio files") 
  })
}
}
