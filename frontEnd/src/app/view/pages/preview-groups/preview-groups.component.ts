import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap/modal/modal-dismiss-reasons';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { StudentsListComponent } from '../students-list/students-list.component';
@Component({
  selector: 'app-preview-groups',
  templateUrl: './preview-groups.component.html',
  styleUrls: ['./preview-groups.component.css']
})
export class PreviewGroupsComponent implements OnInit {
students:any=[];
  constructor( 
    public router:ActivatedRoute,
    public _groupservice:GroupsService,
    public dialog : MatDialog
    ) { }
    public groupID=this.router.snapshot.paramMap.get('id')
  ngOnInit(): void {
    console.log(this.groupID)
    this._groupservice.listExamineesInGroup(this.groupID).subscribe((result:any)=>{
      this.students=result.examinees;
      console.log(result);
    })
    
  }
  openDialog()
  { const dialogConfig= new MatDialogConfig();

    dialogConfig.width="60%";
    this.dialog.open(StudentsListComponent,dialogConfig)
  }
  sendid(){
    this._groupservice.groupIdForAssign=this.groupID
  }
  removeExamineeFromGroup(id: any){
    this._groupservice.groupIdForAssign = this.groupID
    this._groupservice.removeExamineeFromGroup(id).subscribe((result=>{
      console.log('examinee removed successfully')
      this.ngOnInit()
    }))
  }

}
