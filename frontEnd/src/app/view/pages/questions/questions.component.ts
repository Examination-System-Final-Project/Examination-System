import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormControlDirective, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  questionType:any;
  questionForm!: UntypedFormGroup;
  constructor(private formBuilder : UntypedFormBuilder,
    private router : Router,
    private createMcq : QuestionsService,
    public nav:NavBarServiceService
) { }
  
    ngOnInit():void
    {
      this.nav.hide()
      this.questionForm=this.formBuilder.group({
        
        questionType:new UntypedFormControl(''),
        questionDifficulty:new UntypedFormControl(''),
        questionTitle:new UntypedFormControl(''),
        questionWeight:new UntypedFormControl(''),
        Option_1:new UntypedFormControl(''),
        Option_2:new UntypedFormControl(''),
        Option_3:new UntypedFormControl(''),
   correctAnswer:new UntypedFormControl(''),
   questionBank_ID : new UntypedFormControl ('') ,
  type:new UntypedFormControl('') 
      });
      
    }
  }
   
//     createQuestionMcq() {
//       this.createMcq.createMcq(this.questionForm.value,).subscribe((res)=>{
//         console.log(res);
//       },err=>{
//         console.log(err)
//       })

//     }
// }
