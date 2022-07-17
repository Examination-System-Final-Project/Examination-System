import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateExamService } from 'src/app/services/exam/create-exam.service';
import { AddQuestionToExamComponent } from '../add-question-to-exam/add-question-to-exam.component';

@Component({
  selector: 'app-edit-exam-questions',
  templateUrl: './edit-exam-questions.component.html',
  styleUrls: ['./edit-exam-questions.component.css']
})
export class EditExamQuestionsComponent implements OnInit {
  desdata:any=[];
  form!:UntypedFormGroup
  grade:any
  constructor(private _exam:CreateExamService,
    public router:ActivatedRoute,
    public dialog : MatDialog,
    private modalService :NgbModal,
    ) { }
    closeResult! : string;
    public ExamID=this.router.snapshot.paramMap.get('id')
  ngOnInit(): void {this.form=new UntypedFormGroup({
   
    grade:new UntypedFormControl,

});
  
    this._exam.listExamQuestions(this.ExamID).subscribe ((result:any) => {
      this.desdata=result.questions;
      console.log(this.desdata) ;
      result.questions.Grade=this.grade
   })
 
  }
deleteQuestion(questionid:any){
  this._exam.deleteQuestionInExam(this.ExamID,questionid).subscribe ((result:any) => {
    console.log("done deleting")
    this.ngOnInit()
 })

}
sendid(){
  this._exam.examIdForadding=this.ExamID
}
openDialog()
{ const dialogConfig= new MatDialogConfig();

  dialogConfig.width="60%";
  this.dialog.open(AddQuestionToExamComponent,{
    autoFocus: false,
    maxHeight: '90vh' //you can adjust the value as per your view
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
editGrade()
{
  this._exam.questiongrade=this.form.value
    this._exam.editQuestionGrade(this.ExamID,this._exam.qesid,).subscribe((res)=>{
      this.ngOnInit()
     console.log(res)
   },err=>
   {
     console.log(err)
   })
  
    
}
sendidforgrade(grade:any,id:any){
this._exam.questiongrade=grade
this._exam.qesid=id
}
}
