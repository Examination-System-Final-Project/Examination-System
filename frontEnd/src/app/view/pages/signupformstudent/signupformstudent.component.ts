import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup} from '@angular/forms';
import { Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CreateExamineeService } from 'src/app/services/examinee/create-examinee.service';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';

@Component({
  selector: 'app-signupformstudent',
  templateUrl: './signupformstudent.component.html',
  styleUrls: ['./signupformstudent.component.css']
})
export class SignupformstudentComponent  implements OnInit {
  signupform!: UntypedFormGroup;
  type="Normal"
  constructor(
    private formBuilder : UntypedFormBuilder,
    private http : HttpClient,
    private router : Router,
    private _createExaminee: CreateExamineeService,
    public nav : NavBarServiceService
  ){
  }
  
  ngOnInit():void
  {
    this.nav.show()
    this.signupform=this.formBuilder.group({
      firstName:new UntypedFormControl('',[Validators.required,Validators.minLength(2),Validators.pattern('[A-Z a-z][a-z][a-z]*')]),
      lastName: new UntypedFormControl('',[Validators.required,Validators.minLength(2),Validators.pattern('[A-Z a-z][a-z][a-z]*')]),
      password:new UntypedFormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(24)]),
      email:new UntypedFormControl('',[Validators.required,Validators.email]),
      phoneNumber:new UntypedFormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[[0][1](0|1|2|5)[0-9]{8}')]),
      gender:new UntypedFormControl('',Validators.required),
 ExamieeCondition:new UntypedFormControl('')
    },
   );

  }
  get f (){
return this.signupform.controls
  }
  signup(){
    // console.log(this.signupform.value)
    this._createExaminee.saveExaminee(this.signupform.value).subscribe((result)=>
    {
      console.log(result)
      alert("sign up successful");
      this.signupform.reset();
      this.router.navigate(['signin'])
    },err=>{
      console.log(err)
    })
  }

  // signup():void{
  //   console.log();
  //    this.http.post('http://localhost:3000/examinee/addExaminee',this.signupform.getRawValue())
  //    .subscribe(res=>{
  //      console.log(res);
  //    });
  // }
  // sendSignUpForm(){
  //   this._createExaminee.setData(this.signupform.getRawValue)
  // }
}

//   optionValue:any;
//   signupform= new FormGroup({
// ID: new FormControl(''),
// FirstName:new FormControl(''),
// LastName: new FormControl(''),
// Password:new FormControl(''),
// email:new FormControl(''),
// PhoneNumber:new FormControl(''),
// Student:new FormControl(''),
// Organization:new FormControl('')
// })

// get ID(){
//    return this.signupform.get('ID');              
// }
// get FirstName(){
//   return this.signupform.get('FirstName');              
// }
// get LastName(){
//   return this.signupform.get('LastName');              
// }
// get Password(){
//   return this.signupform.get('Password');              
// }
// get email(){
//   return this.signupform.get('email');              
// }
// get PhoneNumber(){
//   return this.signupform.get('PhoneNumber');              
// }
// get Student(){
//   return this.signupform.get('Student');              
// }
// get Organization(){
//   return this.signupform.get('Organization')
// }


