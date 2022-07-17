import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListExamService {

  constructor(private http : HttpClient) { }
  listExamineeExams(id:any)
  {
    return this.http.get(`http://localhost:3000/examinee/listExamineeExams?examinee=${id}`)
  }
}
