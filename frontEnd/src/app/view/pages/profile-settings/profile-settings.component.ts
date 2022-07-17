import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { student } from 'src/app/models/student';
import { EditExamineeService } from 'src/app/services/examinee/edit-examinee.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  helper = new JwtHelperService();
  id: any
  prefilledValues : any
  editForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    phoneNumber : new FormControl(''),
    email : new FormControl(''),
  })
  constructor(private editExaminee : EditExamineeService) { }
  // examinee : student = {
  //   id : '',
  //   firstName : '',
  //   lastName : '',    
  //   email : '',
  //   organizationId :''
  // }
  ngOnInit(): void {
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.id=decodedToken.id
    this.editExaminee.getData(this.id).subscribe((res : any)=>{
      console.log(res)
       this.prefilledValues = res
      this.editForm= new FormGroup({
        firstName : new FormControl(this.prefilledValues.FirstName),
        lastName : new FormControl(this.prefilledValues.LastName),
        phoneNumber : new FormControl(this.prefilledValues.PhoneNumber),
        email : new FormControl(this.prefilledValues.Email),
    })
    
    })
  }
editProfile()
{
  this.editExaminee.edit(this.id,this.editForm.value).subscribe((res:any)=>{
    console.log(res);
    
  })
 
}
}
