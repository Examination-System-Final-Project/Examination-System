import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QuestionbankService } from 'src/app/services/questionbank/questionbank.service';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.css']
})
export class SecondStepComponent implements OnInit {

  constructor(private service:QuestionbankService,
    private formBuilder: FormBuilder,) { }
  AutoCreation!: FormGroup;
  desdata:any =[] ;
  maxNum:any
  i=0
  j=1
  send:any=[]
  banksIds:any=[]
  numsArray:any=[]
  mcqArray:any=[]
  tfArray:any=[]
  essayArray:any=[]
  ngOnInit(): void {
  //   this.service.loaddes().subscribe ((result:any) => {
  //     this.desdata=result.questionBanks;
  //     console.log(this.desdata) ;
   
  //  })

   this.AutoCreation=this.formBuilder.group({ 
QuestionBankIds: new FormArray([
  new FormControl (null),

]),
NumberOfQuestions: new FormArray([

  new FormControl (null),

]),
mcq: new FormArray([

  new FormControl (null),

]),
essay: new FormArray([

  new FormControl (null),

]),
tf: new FormArray([

  new FormControl (null),

])
  });


}

get getIds() {
  return this.AutoCreation.get('QuestionBankIds') as FormArray;
}
get Getnums() {
  return this.AutoCreation.get('NumberOfQuestions') as FormArray;
}
get getmcq() {
  return this.AutoCreation.get('mcq') as FormArray;
}
get getessay() {
  return this.AutoCreation.get('essay') as FormArray;
}
get gettf() {
  return this.AutoCreation.get('tf') as FormArray;
}
addIDOpition(){

 
     ( <FormArray>this.AutoCreation.get('NumberOfQuestions')).push(new FormControl(null)) ;
 
     ( <FormArray>this.AutoCreation.get('QuestionBankIds')).push(new FormControl(null)) ;

  ( <FormArray>this.AutoCreation.get('mcq')).push(new FormControl(null)) ;



  ( <FormArray>this.AutoCreation.get('essay')).push(new FormControl(null)) ;
 


  ( <FormArray>this.AutoCreation.get('tf')).push(new FormControl(null)) ;
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
this.mcqArray[i]=this.AutoCreation.value.mcq[i]
this.tfArray[i]=this.AutoCreation.value.tf[i]
this.essayArray[i]=this.AutoCreation.value.essay[i]
this.send.push({"QuesionBankId": this.AutoCreation.value.QuestionBankIds[i], "NumberOfQuestions": this.AutoCreation.value.NumberOfQuestions[i],"mcq":this.AutoCreation.value.mcq[i],"tf":this.AutoCreation.value.tf[i],"essay":this.AutoCreation.value.essay[i]});
}
console.log(this.send)
}
removeBank(){
  if (this.i>0){
  ( <FormArray>this.AutoCreation.get('QuestionBankIds')).removeAt(this.i) ;
  ( <FormArray>this.AutoCreation.get('NumberOfQuestions')).removeAt(this.i) ;
  ( <FormArray>this.AutoCreation.get('mcq')).removeAt(this.i) ;
  ( <FormArray>this.AutoCreation.get('tf')).removeAt(this.i) ;
  ( <FormArray>this.AutoCreation.get('essay')).removeAt(this.i) ;
this.i--
this.j--
console.log('done removing')
}
}

}
