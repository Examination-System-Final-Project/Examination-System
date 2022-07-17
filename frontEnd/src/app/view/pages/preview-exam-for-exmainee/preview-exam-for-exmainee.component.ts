import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/examinee/reports.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-preview-exam-for-exmainee',
  templateUrl: './preview-exam-for-exmainee.component.html',
  styleUrls: ['./preview-exam-for-exmainee.component.css']
})
export class PreviewExamForExmaineeComponent implements OnInit {
  examineeID : any
  helper = new JwtHelperService();
  constructor(    public router:ActivatedRoute,
    private _reports:ReportsService) { }
    desdata:any=[]
  public examId=this.router.snapshot.paramMap.get('id')
  ngOnInit(): void {
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.examineeID = decodedToken.id
    this._reports.getExamQuestion(this.examId,this.examineeID).subscribe ((result:any) => {
      this.desdata=result.examineeAnswersEvaluation;
      console.log(this.desdata) ;
   })
  }

}
