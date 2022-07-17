import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { QuestionbankComponent } from '../questionbank/questionbank.component';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateQuestionDialogComponent } from '../create-question-dialog/create-question-dialog.component';
import { EditChooseFormComponent } from '../edit-choose-form/edit-choose-form.component';
import { EditTrueFalseFormComponent } from '../edit-true-false-form/edit-true-false-form.component';
import { McqFormComponent } from '../mcq-form/mcq-form.component';
@Component({
  selector: 'app-preview-question-bank',
  templateUrl: './preview-question-bank.component.html',
  styleUrls: ['./preview-question-bank.component.css']
})
export class PreviewQuestionBankComponent implements OnInit {
  closeResult! : string;
  optionValue!:any
  QuestionID!:any
  isClosed:boolean=false
 show : boolean=true;
  constructor(private _questionService:QuestionsService,
    public router:ActivatedRoute,
    public nav : NavBarServiceService,
    public dialog : MatDialog) { }
    public QBID=this.router.snapshot.paramMap.get('id')
   questions:any=[];
   
  ngOnInit(): void {
    this.nav.hide()
    console.log(this.QBID)
    this._questionService.listQuestions(this.QBID).subscribe((result:any)=>{
      this.questions=result;
      console.log(result);
    })
    
  }
  openDialog()
  {  const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="80%";
    dialogConfig.height="80%";
    this.dialog.open(CreateQuestionDialogComponent,dialogConfig)
  }
  openEditChooseDialog()
  { const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="80%";
    dialogConfig.height="80%";
    this.dialog.open(EditChooseFormComponent,dialogConfig)
  }
  openEditTFDialog()
  { const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="60%";
    this.dialog.open(EditTrueFalseFormComponent,dialogConfig)
  }
  // open(content : any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  //   this.ngOnInit();
  // }
  
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  //   this.ngOnInit()
  // }
  toggle(e : any)
  {
    if(e.target.value == "mcq" || e.target.value=="true or false" || e.target.value=="essay")
    {
      this.show=!this.show;
    }  
  }
  hideshow()
  {
    return this.show;
  }
  // Open(Content : any) {
  //   this.modalService.open(Content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
   
  // }
  // OpenTF(Content : any) {
  //   this.modalService.open(Content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  //   this.ngOnInit();
  // }
  sendQuestionBnakID()
  {
    this._questionService.questionbankID=this.QBID
  }
  questionID(id:any)
  {
     console.log("test test")
    this.QuestionID=id;
    this._questionService.questionID=this.QuestionID 
    }
    getQuestionID()
    {
      return this.QuestionID;
    }
    deleteQuestion(id:any)
    {
      this._questionService.deleteQuestion(id).subscribe((res)=>{
        this.ngOnInit();
      console.log(res);
    },err=>
    {
      console.log(err)
      })
    }
    closeForm(e:any)
    {
       this.isClosed=e;
    }
    closeNgTemplate()
    {
      return this.isClosed
    }
}
