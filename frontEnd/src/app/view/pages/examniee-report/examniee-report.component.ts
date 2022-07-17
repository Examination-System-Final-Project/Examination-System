import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/examinee/reports.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-examniee-report',
  templateUrl: './examniee-report.component.html',
  styleUrls: ['./examniee-report.component.css']
})
export class ExamnieeReportComponent implements OnInit {
 examineeID : any
 helper = new JwtHelperService();
  constructor(private _reports:ReportsService) { }
desdata:any=[]
  ngOnInit(): void {
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.examineeID = decodedToken.id
    this._reports.GetStudentExams(this.examineeID).subscribe ((result:any) => {
      this.desdata=result.examEvaluationStats;
      console.log(this.desdata) ;
   })
  }

}
