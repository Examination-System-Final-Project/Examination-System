import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { McqFormComponent } from '../mcq-form/mcq-form.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Input() id:any
  questionForm!: UntypedFormGroup;
  defaultValue:String="mcq"
  closeResult! : string;
 @Input() mcqTemplate!:TemplateRef<any>;
 QBID:any
  constructor(private formBuilder : UntypedFormBuilder,
    private createQuestion : QuestionsService,
    private modalService :NgbModal,
    public dialogRef : MatDialogRef<McqFormComponent>) { }

  ngOnInit(): void {
    this.questionForm=this.formBuilder.group({
        
      questionType:new UntypedFormControl(''),
      questionDifficulty:new UntypedFormControl(''),
      questionTitle:new UntypedFormControl(''),
      questionWeight:new UntypedFormControl(''),
      Answer_1:new UntypedFormControl(''),
      Answer_2:new UntypedFormControl(''),
      Answer_3:new UntypedFormControl(''),
 correctAnswer:new UntypedFormControl(''), 
 answers: new UntypedFormArray([
new UntypedFormControl(null),

 ])
    });
    
  }
  recieveQBID()
  {
    this.QBID=this.createQuestion.questionBankID();
    return this.QBID;
  }
  createQuestions() {
    this.createQuestion.createMcq(this.questionForm.value,this.recieveQBID()).subscribe((res)=>{
      console.log(res);
    },err=>{
      console.log(err)
    })
    this.ngOnInit();
    this.onClose()
}
onClose()
{
  this.questionForm.reset()
  this.dialogRef.close()
}

get refForm() {
  return this.questionForm.get('answers') as UntypedFormArray;
}
addOpition(){
 ( <UntypedFormArray>this.questionForm.get('answers')).push(new UntypedFormControl(null)) ;
}

}
