import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
import { AssignQuestionsService } from 'src/app/services/exam/assign-questions.service';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
import { QuestionbankService } from 'src/app/services/questionbank/questionbank.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';

@Component({
  selector: 'app-add-question-to-exam',
  templateUrl: './add-question-to-exam.component.html',
  styleUrls: ['./add-question-to-exam.component.css']
})
export class AddQuestionToExamComponent implements OnInit {
desdata:any=[]
send = false ;
questions:any=[]
new:any=[]
ExamQuestions:any=[]
  questionbankid: any;
  assignquestions!: UntypedFormGroup;
  grade !: UntypedFormGroup
  questionid: any;
  helper = new JwtHelperService();
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  public isButtonVisible = true;
  constructor(private _questionBank:QuestionbankService,
    private _questionService:QuestionsService,
    private formBuilder: UntypedFormBuilder,
    private _assignQuestion:AssignQuestionsService,
    private _create:CreateExamService,
    ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
    this._questionBank.loaddes(this.instructor.id).subscribe ((result:any) => {
      this.desdata=result.questionBanks;
      console.log(this.desdata) ;
   })
   this.grade = this.formBuilder.group({
    questionGrade : ['',Validators.required]
  })
  this._create.listExamQuestions(this._create.examIdForadding).subscribe ((result:any) => {
    this.ExamQuestions=result.questions;

   
 })
 
  }
  lol(e:any){
    console.log(e.target.value)
    this.questionbankid=e.target.value
    this._create.listQuestionInQuestionBankNotInExam(this.questionbankid).subscribe((result:any)=>{
      this.questions=result.newQuestionsList;
      console.log(result);
      this.grade.controls['questionGrade'].setValue(1);
      })
  
      }
      addQuestionToExam(id:any){
        this._assignQuestion.examid=this._create.examIdForadding
this._assignQuestion.questionid=id
        this._assignQuestion.assignQuestion(this.grade.value).subscribe((result:any)=>{
          alert ('done')
       
        }
    )
      }
      isShown: boolean = true; // hidden by default

      toggleHide(id:any) {
        const el = <HTMLElement>document.getElementById(id);
          if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
          } else {
            el.classList.add('hidden');
          }
          
      }
     
}
