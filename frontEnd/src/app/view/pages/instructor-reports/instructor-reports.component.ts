import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/examinee/reports.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { instructor } from 'src/app/models/instructor';
@Component({
  selector: 'app-instructor-reports',
  templateUrl: './instructor-reports.component.html',
  styleUrls: ['./instructor-reports.component.css']
})
export class InstructorReportsComponent implements OnInit {
  desdata:any=[]
  instructorId : any
  instructor : instructor = { 
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId : 1
  }
  helper = new JwtHelperService();
  constructor(private _reports:ReportsService) { }

  ngOnInit(): void {
     const token = localStorage.getItem('tokenInstructor')! 
    const decodedToken = this.helper.decodeToken(token)
    this.instructor.id=decodedToken.id
    this._reports.getInstructorExams( this.instructor.id).subscribe ((result:any) => {
      this.desdata=result.instructorExams;
      console.log(this.desdata) ;
      console.log(this.instructorId) ;
   })
  }

}
