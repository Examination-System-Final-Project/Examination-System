import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
import { QuestionbankService } from 'src/app/services/questionbank/questionbank.service';

@Component({
  selector: 'app-auto-exam-generation',
  templateUrl: './auto-exam-generation.component.html',
  styleUrls: ['./auto-exam-generation.component.css']
})
export class AutoExamGenerationComponent implements OnInit {

  constructor(private service:QuestionbankService,
    private _auto :CreateExamService,
    private formBuilder: FormBuilder,) { }
  AutoCreation!: FormGroup;
  desdata:any =[] ;
  maxNum:any
  i=0
  j=1
  arrayOfQuestionBanks:any=[]
  banksIds:any=[]
  numsArray:any=[]
  helper = new JwtHelperService();
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  ngOnInit(): void {
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
    this.service.loaddes(this.instructor.id).subscribe ((result:any) => {
      this.desdata=result.questionBanks;
      console.log(this.desdata) ;
   
   })

   this.AutoCreation=this.formBuilder.group({ 
QuestionBankIds: new FormArray([
  new FormControl (null),

]),
NumberOfQuestions: new FormArray([

  new FormControl (null),

]),
mark: new UntypedFormControl('')


  });


}

get getIds() {
  return this.AutoCreation.get('QuestionBankIds') as FormArray;
}
get Getnums() {
  return this.AutoCreation.get('NumberOfQuestions') as FormArray;
}

addIDOpition(){

 
     ( <FormArray>this.AutoCreation.get('NumberOfQuestions')).push(new FormControl(null)) ;
 
     ( <FormArray>this.AutoCreation.get('QuestionBankIds')).push(new FormControl(null)) ;

  
  this.i ++ ;
  this.j ++;

}

lol(e:any,max:any){
 console.log(e.target.value)
 this.maxNum=e.target.value

    }
    bassem(num:any){
     
      console.log(this.maxNum)
    }
test(){
for (var i=0 ; i<this.j;i++){
this.banksIds[i]=this.AutoCreation.value.QuestionBankIds[i]
this.numsArray[i]=this.AutoCreation.value.NumberOfQuestions[i]

this.arrayOfQuestionBanks.push({"QuesionBankId": this.AutoCreation.value.QuestionBankIds[i], "NumberOfQuestions": this.AutoCreation.value.NumberOfQuestions[i]});
}

}
removeBank(){
  if (this.i>0){
  ( <FormArray>this.AutoCreation.get('QuestionBankIds')).removeAt(this.i) ;
  ( <FormArray>this.AutoCreation.get('NumberOfQuestions')).removeAt(this.i) ;
;
this.i--
this.j--
console.log('done removing')
}
}
submit(){
  this._auto.autoExam(this.arrayOfQuestionBanks,this.AutoCreation.controls['mark'].value ,this._auto.examIdForAutoGeneration).subscribe((result:any) => {

    console.log("done Creating") ;
 this._auto.step++;
 })
 console.log(this.arrayOfQuestionBanks)
}
}