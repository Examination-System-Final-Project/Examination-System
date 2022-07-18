import { Component, OnInit } from '@angular/core';
import { QuestionbankService } from 'src/app/services/questionbank/questionbank.service'; 
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { UntypedFormGroup} from '@angular/forms';
import { Validators} from '@angular/forms';
import { DeleteQuestionBankService } from 'src/app/services/questionbank/delete-question-bank.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html',
  styleUrls: ['./questionbank.component.css']
})
export class QuestionbankComponent implements OnInit {
  
  closeResult! : string;
  form!:UntypedFormGroup
desdata:any =[] ;
helper = new JwtHelperService();
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  constructor(private service:QuestionbankService,
               private modalService :NgbModal,
               private formBuilder : UntypedFormBuilder,
               private _deleteQuestionbankService : DeleteQuestionBankService,
               public router : Router,
               public nav : NavBarServiceService ) {
   }

  ngOnInit(): void {
    const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
    this.nav.hide()
    this.service.loaddes(this.instructor.id).subscribe ((result:any) => {
      this.desdata=result.questionBanks;
      console.log(this.desdata) ;
   })
   this.form=this.formBuilder.group({
    QuestionBankName : new UntypedFormControl('')
   })
  }
  createQuestionBank(){
          this.service.createQuestionBank(this.form.value, this.instructor.id).subscribe((result)=>
          {
            this.ngOnInit();
            console.log(result)
            
            this.form.reset();
          },err=>
          {
            alert("something went wrong ")
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
  deleteQuestionBank(id:any ){
    this._deleteQuestionbankService.deleteQuestionBank(id).subscribe((res)=>{
      this.ngOnInit();
      console.log(res);
    },err=>
    {
      console.log(err);
    })
    this.ngOnInit()
  }
  // navigateToPreview(id:any)
  // {
  //   this.router.navigate(['/dashpreviewQuestionBank',id])
  // }
}