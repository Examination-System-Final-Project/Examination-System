import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditExamineeService {
  url='http://localhost:3000/examinee/editExaminee';
  constructor(private http : HttpClient) { }
  edit(id : any, data : any)
  {
    return this.http.put(`http://localhost:3000/examinee/editExaminee?examinee=${id}`,data)
  }
  getData(id  : any)
  {
    return this.http.get(`http://localhost:3000/examinee/selectExaminee?examinee=${id}`)
  }
}
