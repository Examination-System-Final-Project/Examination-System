import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DeleteQuestionService {
examid:any
questionid:any
  constructor(private http : HttpClient) { }
  deletequestion()
  {
    const params=new HttpParams()
    .set('question',this.questionid)
    .set('exam',this.examid)
     return this.http.delete(`http://localhost:3000/exam/removeQuestionFromExam`,{params})
  }
}
