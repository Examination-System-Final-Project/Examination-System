import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/examinee/reports.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-instructor-reports',
  templateUrl: './instructor-reports.component.html',
  styleUrls: ['./instructor-reports.component.css']
})
export class InstructorReportsComponent implements OnInit {
  desdata:any=[]
  instructorId : any
  helper = new JwtHelperService();
  constructor(private _reports:ReportsService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructorId = decodedToken.id
    this._reports.getInstructorExams('9').subscribe ((result:any) => {
      this.desdata=result.instructorExams;
      console.log(this.desdata) ;
      console.log(this.instructorId) ;
   })
  }

}
