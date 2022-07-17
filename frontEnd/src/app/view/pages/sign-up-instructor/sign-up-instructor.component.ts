import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup} from '@angular/forms';
import { Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CreateInstructorService } from 'src/app/services/instructor/create-instructor.service';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
@Component({
  selector: 'app-sign-up-instructor',
  templateUrl: './sign-up-instructor.component.html',
  styleUrls: ['./sign-up-instructor.component.css']
})
export class SignUpInstructorComponent implements OnInit {
  signupform!: UntypedFormGroup;
  constructor(
    private formBuilder : UntypedFormBuilder,
    private http : HttpClient,
    private router : Router,
    private _createInstructor : CreateInstructorService,
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
 organization_ID:new UntypedFormControl('1'),
 gender:new UntypedFormControl('',Validators.required)
    });
  }
   get f (){
    return this.signupform.controls
      }
  signup(){
    this._createInstructor.saveInstructor(this.signupform.value).subscribe((result)=>
    {
      console.log(result)
      alert("sign up successful");
      this.signupform.reset();
      this.router.navigate(['signin'])
    },err=>{
      console.log(err)
      alert("something went wrong ")
    })
    // console.log();
    //  this.http.post('http://localhost:3000/instructor/addInstructor',this.signupform.getRawValue())
    //  .subscribe(res=>{
    //    console.log(res);
    //  });
  }
}


