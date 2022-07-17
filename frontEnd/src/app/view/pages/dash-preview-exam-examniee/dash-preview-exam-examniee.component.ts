import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { student } from 'src/app/models/student';
import { FooterService } from 'src/app/services/core/footer.service';
import { LoginExamineeService } from 'src/app/services/examinee/login-examinee.service';

@Component({
  selector: 'app-dash-preview-exam-examniee',
  templateUrl: './dash-preview-exam-examniee.component.html',
  styleUrls: ['./dash-preview-exam-examniee.component.css']
})
export class DashPreviewExamExamnieeComponent implements OnInit {

  showMe:boolean=true
  examinee : student = {
    id : '',
    firstName : '',
    lastName : '',    
    email : '',
    organizationId :''
  }
  helper = new JwtHelperService();
  toggle(){

    this.showMe=!this.showMe
  } 
  constructor(public auth:LoginExamineeService,
    private logoutexaminee : LoginExamineeService,
    private footer : FooterService) { }
   
  ngOnInit(): void {
    this.footer.hide()
    const token = localStorage.getItem('token')! 
    const decodedToken = this.helper.decodeToken(token)
    this.examinee.firstName=decodedToken.firstName
  }
  logoutExaminee()
  {
    this.logoutexaminee.logout()
  }

}
