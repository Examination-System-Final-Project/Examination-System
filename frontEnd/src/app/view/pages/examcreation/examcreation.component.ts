import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { QuestionbankService } from 'src/app/services/questionbank/questionbank.service'; 
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
import { AssignQuestionsService } from 'src/app/services/exam/assign-questions.service';
import { DeleteQuestionService } from 'src/app/services/exam/delete-question.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AutoExamGenerationComponent } from '../auto-exam-generation/auto-exam-generation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
@Component({
  selector: 'app-examcreation',
  templateUrl: './examcreation.component.html',
  styleUrls: ['./examcreation.component.css']
})
export class ExamcreationComponent implements OnInit {
  title = 'angular13bestcode';
 
  examcreationphase1!: UntypedFormGroup;
  assignquestions!: UntypedFormGroup;
  educationalDetails!: UntypedFormGroup;
defaultValue=1 ;
  examcreationphase1_step = false;
  examcreationphase2_step = false;
  education_step = false;
  step = 1;
  questionbankid:any
  questionid: any ;
  groupID :any ;
  questions:any=[];
desdata:any=[] ;
send = false ;
sendGroup = false ;
examid:any =[] ;

groups:any= [] ;
isChecked:any
numberOfQuestion=0 ;
examGrade=0 ;
value=0
grade !: UntypedFormGroup
startTime:any
endTime:any
instructorId : any
helper = new JwtHelperService();
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  constructor(private formBuilder: UntypedFormBuilder,
    private service:QuestionbankService,
    private _questionService:QuestionsService,
    private _createexam :CreateExamService,
    private _assignQuestion:AssignQuestionsService,
    private _deletequestion:DeleteQuestionService,
    private _groups:GroupsService,
    public dialog : MatDialog) { }

  ngOnInit() {
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
    this.service.loaddes(this.instructor.id).subscribe ((result:any) => {
      this.desdata=result.questionBanks;
      console.log(this.desdata) ;
   })
   this._groups.listgroups(this.instructor.id).subscribe((result:any) => {
this.groups=result.groups;
console.log(this.groups) ;})
        this.examcreationphase1 = this.formBuilder.group({
          examName: ['', Validators.required],
            description: ['',Validators.required],
            duration: ['', Validators.required],
            startDate: ['',Validators.required],
            startTime: ['',[Validators.required,Validators.pattern('([0-1]?[0-9]|2[0-3]):[0-5][0-9]')]],
            endTime: ['',[Validators.required,Validators.pattern('([0-1]?[0-9]|2[0-3]):[0-5][0-9]')]],
            endDate: ['',[Validators.required,]],
            numberOfAttempts : ['', Validators.required],
          
        });

        this.assignquestions = this.formBuilder.group({
          questionbank: [''],
            
        });

        this.educationalDetails = this.formBuilder.group({
            highest_qualification: ['', Validators.required],
            university: ['', Validators.required],
            total_marks: ['',Validators.required]
        });
        this.grade = this.formBuilder.group({
          questionGrade : ['',Validators.required]
        })
  }
  get f (){
    return this.examcreationphase1.controls
      }
  get phase1() { return this.examcreationphase1.controls; }
  
  get phase2() { return this.assignquestions.controls; }

  get phase3() { return this.educationalDetails.controls; }
  next(){

    if(this.step==1){
          this.examcreationphase1_step = true;
          if (this.examcreationphase1.invalid) { return  }
          this.step++
    }

    else if(this.step==2){
        this.examcreationphase2_step = true;
        if (this.assignquestions.invalid) { return }
            this.step++;
            this._assignQuestion.setExamGrade(this.examGrade,this.examid).subscribe((res:any)=>{
              console.log(res);
            })
    }
    
    else if(this.step==3||this._createexam.step==3){
      this.education_step = true;
      if (this.assignquestions.invalid) { return }
          this.step++;
  }
  }


  previous(){
    this.step--
   
    if(this.step==1){
      this.examcreationphase2_step = false;
    }
    if(this.step==2){
      this.examcreationphase2_step = false;
    }
   
  }

  submit(){
   
    if(this.step==3){
      this.education_step = true;
      if (this.educationalDetails.invalid) { return }
      alert("Well done!!")
    }
  }

  lol(e:any){
console.log(e.target.value)
this.questionbankid=e.target.value
this._questionService.listQuestions(this.questionbankid).subscribe((result:any)=>{
  this.questions=result;
  console.log(this.questions);
  this.grade.controls['questionGrade'].setValue(1);
  })
  }
  selected (e:any,id:any) {
    this.send=!this.send ;
    if (e.target.checked){
    console.log("true")
    this.questionid=id
    this._assignQuestion.questionid=this.questionid 
    console.log(this.questionid)
   this.assignQuestion(this.grade.value) 
  this. value=  parseInt(this.grade.controls['questionGrade'].value); 
   this.increasGrade (this.value)

    }
  if (!e.target.checked) {
  console.log("false")
  this.questionid=id
  this._deletequestion.questionid=this.questionid
  this.value =  parseInt(this.grade.controls['questionGrade'].value); 
  this.decreasGrade(this.value)
  this.deleteQuestion()
}
  }
examcreate(){
  this.concate()
  this.concate2()
  this.examcreationphase1.removeControl('startDate');  
  this.examcreationphase1.controls['startTime'].setValue(this.startTime);
  this.examcreationphase1.removeControl('endDate');
  this.examcreationphase1.controls['endTime'].setValue(this.endTime);
  console.log(this.examcreationphase1.value)
  this._createexam.createExam(this.instructor.id,this.examcreationphase1.value).subscribe((result:any)=>
    {
      
      alert("exam created");
this.examid=result.insertId ;
this._assignQuestion.examid=this.examid 
this._deletequestion.examid=this.examid 
this._createexam.examIdForAutoGeneration=this.examid
console.log(this.examid )
    },err=>{
      console.log(err)
      alert("something went wrong ")

})

}
assignQuestion(grade : any){
  this._assignQuestion.assignQuestion(grade).subscribe((result:any)=>
 
  {
    this.numberOfQuestion++
    console.log("done assign"+this.numberOfQuestion) 
  })

}
assignGroup(){
  this._groups.assignExamToGroup(this.examid,this.groupID).subscribe((result:any)=>
 
  {
   
    console.log("done assign") 
  },err=>{
    console.log(err)
  })}
deleteQuestion(){
  this._deletequestion.deletequestion().subscribe((result:any)=>

  {
    this.numberOfQuestion--
    console.log("done delet"+this.numberOfQuestion) 
  })

}
removeGroupFromExam(){
  this._groups.removeExamFromGroup(this.examid,this.groupID).subscribe((result:any)=>

  {
    
    console.log("done removing") 
  })

}
selectGroup (e:any,id:any) {
  this.sendGroup=!this.sendGroup ;
  if (e.target.checked){
  console.log("true")

  this._groups.examid=this.examid 
  this.groupID=e.target.value
  this._groups.groupid=this.groupID 
  console.log(this.groupID)
 this.assignGroup() 
 this.generateUniqeExam(this.groupID)
  }
if (!e.target.checked) {
console.log("false")
this.groupID=id
this.removeGroupFromExam()
this.deleteUniqueExamForEachStudentInGroup(this.groupID)
}
}
generateUniqeExam(id:any){
  this._groups.generateUniqeExamToGroup(id,this.examid).subscribe((result:any)=>

  {
    
    console.log("done generateUniqeExam") 
  })

}
deleteUniqueExamForEachStudentInGroup(id:any){
  this._groups.deleteUniqueExamForEachStudentInGroup(id,this.examid).subscribe((result:any)=>

  {
    
    console.log("done deleteUniqueExamForEachStudentInGroup") 
  })
}

increasGrade(grade:any){
  this.examGrade=this.examGrade+grade
}
decreasGrade(grade:any){
  this.examGrade=this.examGrade-grade
}
openDialog()
{  const dialogConfig= new MatDialogConfig();

  dialogConfig.width="80%";
  dialogConfig.height="80%";
  this.dialog.open(AutoExamGenerationComponent,dialogConfig)
}
concate (){

 
  var year =this.examcreationphase1.value.startDate.year; 
 
  var month =this.examcreationphase1.value.startDate.month; 
  if (this.examcreationphase1.value.startDate.month==1||this.examcreationphase1.value.startDate.month==2||this.examcreationphase1.value.startDate.month==3||this.examcreationphase1.value.startDate.month==4||this.examcreationphase1.value.startDate.month==5||this.examcreationphase1.value.startDate.month==6||this.examcreationphase1.value.startDate.month==7||this.examcreationphase1.value.startDate.month==8||this.examcreationphase1.value.startDate.month==9){
     month =("0")+this.examcreationphase1.value.startDate.month; 
  }
  var day =this.examcreationphase1.value.startDate.day; 
  if (this.examcreationphase1.value.startDate.day==1||this.examcreationphase1.value.startDate.day==2||this.examcreationphase1.value.startDate.day==3||this.examcreationphase1.value.startDate.day==4||this.examcreationphase1.value.startDate.day==5||this.examcreationphase1.value.startDate.day==6||this.examcreationphase1.value.startDate.day==7||this.examcreationphase1.value.startDate.day==8||this.examcreationphase1.value.startDate.day==9){
    day =("0")+this.examcreationphase1.value.startDate.day; 
 }
  var space =(' '); 
var str2 = this.examcreationphase1.value.startTime+(':00'); 
 this.startTime = year+('-')+month+('-')+day+space+str2;
 console.log(this.startTime)
}
concate2(){
 var year2= this.examcreationphase1.controls['endDate'].value.year
 console.log(year2)
 var month2 =this.examcreationphase1.controls['endDate'].value.month
 if (this.examcreationphase1.controls['endDate'].value.month==1||this.examcreationphase1.controls['endDate'].value.month==2||this.examcreationphase1.controls['endDate'].value.month==3||this.examcreationphase1.controls['endDate'].value.month==4||this.examcreationphase1.controls['endDate'].value.month==5||this.examcreationphase1.controls['endDate'].value.month==6||this.examcreationphase1.controls['endDate'].value.month==7||this.examcreationphase1.controls['endDate'].value.month==8||this.examcreationphase1.controls['endDate'].value.month==9){
  month2 =("0")+this.examcreationphase1.controls['endDate'].value.month; 
}
console.log( this.examcreationphase1.value.endDate) 
 var day2 =this.examcreationphase1.controls['endDate'].value.day; 
 if (this.examcreationphase1.controls['endDate'].value.day==1||this.examcreationphase1.controls['endDate'].value.day==2||this.examcreationphase1.controls['endDate'].value.day==3||this.examcreationphase1.controls['endDate'].value.day==4||this.examcreationphase1.controls['endDate'].value.day==5||this.examcreationphase1.controls['endDate'].value.day==6||this.examcreationphase1.controls['endDate'].value.day==7||this.examcreationphase1.controls['endDate'].value.day==8||this.examcreationphase1.controls['endDate'].value.day==9){
  day2 =("0")+this.examcreationphase1.controls['endDate'].value.day; 
}
var space =(' '); 
var str22 = this.examcreationphase1.controls['endTime'].value+(':00'); 
this.endTime = year2+('-')+month2+('-')+day2+space+str22;
console.log(this.endTime)
}
}