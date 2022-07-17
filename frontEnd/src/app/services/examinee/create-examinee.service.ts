import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupformstudentComponent } from 'src/app/view/pages/signupformstudent/signupformstudent.component';
@Injectable({
  providedIn: 'root'
})
export class CreateExamineeService {
url='http://localhost:3000/examinee/addExaminee';
// private formData : any
 
  constructor(private http : HttpClient) { }
  //  setData(data : any)
  // {
  //   this.formData=data;
  // }
  saveExaminee(data : any)
  {
    console.log(data)
    return this.http.post(this.url,data)
    // return this.http.post(this.url,this.formData)
  }
}
