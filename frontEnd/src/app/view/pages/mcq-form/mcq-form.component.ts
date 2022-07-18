import { Component, Input, OnInit,AfterViewInit, ViewChild, OnDestroy, Output,EventEmitter, TemplateRef } from '@angular/core';
import { FormArray, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
@Component({
  selector: 'app-mcq-form',
  templateUrl: './mcq-form.component.html',
  styleUrls: ['./mcq-form.component.css']
})
export class McqFormComponent implements OnInit {
  @Input() id:any
  questionForm!: UntypedFormGroup;
  i=0
  questionID:any
  defaultValue:String="mcq"
  closeResult! : string;
 @Input() mcqTemplate!:TemplateRef<any>;
 QBID:any
  constructor(private formBuilder : UntypedFormBuilder,
    private createQuestion : QuestionsService,
    private modalService :NgbModal,

    private _create :CreateExamService,
    public dialogRef : MatDialogRef<McqFormComponent>) { }


  ngOnInit(): void {

    this.questionForm=this.formBuilder.group({
     
      questionType:new UntypedFormControl(''),
      questionDifficulty:new UntypedFormControl(''),
      questionTitle:new UntypedFormControl(''),
      questionWeight:new UntypedFormControl(''),

     
 correctAnswer:new UntypedFormControl(''), 
 answers: new UntypedFormArray([
 new UntypedFormControl (null),
 new UntypedFormControl (null),
 ])
 
    });
    
  }
  recieveQBID()
  {
    this.QBID=this.createQuestion.questionBankID();
    return this.QBID;
  }
  createQuestions() {
    console.log(this.questionForm.value)
    this.createQuestion.createMcq(this.questionForm.value,this.recieveQBID()).subscribe((res:any)=>{
      console.log(res);
      this.questionID=res.questionId
      console.log(this.questionID)
      this.questionForm.reset()
      this.questionForm.controls['questionType'].setValue('mcq')
      this.i=0 ;
      this.generateAudio()
    },err=>{
      console.log(err.error)
      this.questionForm.reset()
    })
    this.ngOnInit();
 
}
removeOpition()
{
  if (this.i>0){
    ( <FormArray>this.questionForm.get('answers')).removeAt(this.i+1) ;
    this.i -- ;
}
}

get refForm() {
  return this.questionForm.get('answers') as UntypedFormArray;
}
addOpition(){

  if (this.i<4){
     ( <UntypedFormArray>this.questionForm.get('answers')).push(new UntypedFormControl(null)) ;
     this.i ++ ;
}

}
generateAudio(){
  this._create.generateAudioFiles(this.questionID).subscribe((result:any)=>

  {
    
    console.log("done creating audio files") 
  })
}
}
