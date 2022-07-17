import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
import { AssignQuestionsService } from 'src/app/services/exam/assign-questions.service';
import { DeleteQuestionService } from 'src/app/services/exam/delete-question.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { QuestionbankService } from 'src/app/services/questionbank/questionbank.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { TabNavigationService } from 'src/app/services/tab-navigation.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.css']
})
export class FirstStepComponent implements OnInit {
  QBdata : any
  groups : any
  createExamForm! : UntypedFormGroup
  examid:any =[] ;
  examCreationDone : boolean = false
  constructor(private formBuilder: UntypedFormBuilder,
    private service:QuestionbankService,
    private _questionService:QuestionsService,
    private _createexam :CreateExamService,
    private _assignQuestion:AssignQuestionsService,
    private _deletequestion:DeleteQuestionService,
    private _groups:GroupsService,
    private tab : TabNavigationService) { }

  ngOnInit(): void {
  //   this.service.loaddes().subscribe ((result:any) => {
  //     this.QBdata=result.questionBanks;
  //     console.log(this.QBdata) ;
  //  })
  //  this._groups.listgroups().subscribe((result:any) => {
  //   this.groups=result.groups;
  //   console.log(this.groups) ;})
  //   this.createExamForm = this.formBuilder.group({
  //     examName: ['', Validators.required],
  //       description: ['',Validators.required],
  //       duration: ['', Validators.required],

  //       startTime: ['',Validators.required],
  //       endTime: ['',Validators.required],
  //       numberOfAttempts : ['', Validators.required],
      
  //   });
}
// createexam()
// {
//   this._createexam.createExam(this.createExamForm.value).subscribe((res:any)=>{
//     console.log(res)
//     this.examCreationDone=true
//     this.tab.examCreationSuccess=true
//     this.examid=res.insertId ;
// this._assignQuestion.examid=this.examid 
// this._deletequestion.examid=this.examid 
//   })
// }
}
