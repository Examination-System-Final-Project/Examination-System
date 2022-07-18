import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups/groups.service';
@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  desdata:any =[] ;
  constructor(private _group:GroupsService,) { }

  ngOnInit(): void {
    this._group.listStudents().subscribe ((result:any) => {
      this.desdata=result.examinees;
      console.log(this.desdata) ;
   })

  }
addstudent(id:any){
this._group.assignExamineeToGroup(id).subscribe((result)=>
{
  this.ngOnInit()
  alert("student has been added successfully");
},err=>
{
  alert("Student Already in This Group ")
})

}
}
