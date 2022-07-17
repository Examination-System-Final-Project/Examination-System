import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListStudentExamService {

  constructor(private http : HttpClient) { }
  listQuestionsInExam(id:any, id2:any)
  {
    return this.http.get(`http://localhost:3000/exam/listExamQuestionsForExaminee?exam=${id}&examinee=${id2}`)
  }
}
