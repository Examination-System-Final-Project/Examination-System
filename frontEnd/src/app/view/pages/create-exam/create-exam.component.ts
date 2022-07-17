import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CreateExamService } from 'src/app/services/create-exam.service';
import { AssignQuestionsService } from 'src/app/services/exam/assign-questions.service';
import { DeleteQuestionService } from 'src/app/services/exam/delete-question.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { QuestionbankService } from 'src/app/services/questionbank/questionbank.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { TabNavigationService } from 'src/app/services/tab-navigation.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
 
  constructor(public tab : TabNavigationService){}
  ngOnInit(): void {
    
  }
  }


