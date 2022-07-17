import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { EditChooseFormComponent } from '../edit-choose-form/edit-choose-form.component';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {

  editForm=new UntypedFormGroup({
    examName:new UntypedFormControl(''),
    duration:new UntypedFormControl(''),
    startTime:new UntypedFormControl(''),
    endTime:new UntypedFormControl(''),
    description:new UntypedFormControl('')

  });
  prefilledInputs:any =[] ;  // editForm!: FormGroup;
  // defaultValue:String="mcq"
  constructor(private formBuilder : UntypedFormBuilder,
  private _exam :CreateExamService, 
  private questionService:QuestionsService,
    ) { }
    
  ngOnInit(): void {
    console.log(this._exam.examIdForEdit)
   this._exam.getQuestionOfExamID(this._exam.examIdForEdit).subscribe((result:any)=>{
    console.log(result)
     this.prefilledInputs=result.examInfo

     this.editForm=new FormGroup({
      examName:new FormControl(this.prefilledInputs[0].ExamName),
      duration:new FormControl(this.prefilledInputs[0].Duration),
      startTime:new FormControl(this.prefilledInputs[0].StartTime.replace(/T/,' ').replace(/Z/,' ').replace(/\..+/, '') ),
      endTime:new FormControl(this.prefilledInputs[0].EndTime.replace(/T/,' ').replace(/Z/,' ').replace(/\..+/, '') ),
      description:new FormControl(this.prefilledInputs[0] .Description),


  });
   })
     
  }
 editQuestion()
 {
     this._exam.editExam(this._exam.examIdForEdit,this.editForm.value).subscribe((res)=>{
      console.log(res)
      alert("done editing")
    },err=>
    {
      console.log(err)
    })

     
 }

}
