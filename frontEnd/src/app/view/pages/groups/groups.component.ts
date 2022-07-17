import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup} from '@angular/forms';
import { Validators} from '@angular/forms';
import { DeleteQuestionBankService } from 'src/app/services/questionbank/delete-question-bank.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

import { GroupsService } from 'src/app/services/groups/groups.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  closeResult! : string;
  desdata:any  ;
groups :any=[] ;
helper = new JwtHelperService();
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  form!:UntypedFormGroup;
  constructor( private modalService :NgbModal
    ,private _groupService:GroupsService,
    private formBuilder : UntypedFormBuilder,) { }

  ngOnInit(): void {
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
    console.log(this.instructor.id)
    this.form=this.formBuilder.group({
      groupName : new UntypedFormControl(''),
      groupDescription : new UntypedFormControl('')
     })
     this._groupService.listgroups(this.instructor.id).subscribe ((result:any) => {
      this.desdata=result;
      this.groups=result.groups;
      console.log(this.groups) ;
   })
  }
  open(content : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  createGroup(){
   
    this._groupService.createGroup(this.form.value, this.instructor.id).subscribe((result)=>
    {
     
      console.log(result)
      alert("group created successfully");
      this.form.reset();
    },err=>
    {
      alert("something went wrong ")
    })}

    deleteGroup(id:any){
      this._groupService.deleteGroup(id).subscribe((res)=>{
        this.ngOnInit();
        console.log(res);
      },err=>
      {
        console.log(err);
      })
      this.ngOnInit()
    }
}

