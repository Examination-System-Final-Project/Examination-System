import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams,HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AssignQuestionsService {
examid:any
questionid:any
bassem:any
  constructor(private http : HttpClient) { }
  assignQuestion(grade : any)
  {
    const params=new HttpParams()
    .set('question',this.questionid)
    .set('exam',this.examid)
     const options = {
       params : params
     }
     return this.http.post(`http://localhost:3000/exam/assignQuestionToExam?question=${this.questionid}&exam=${this.examid}`,{questionGrade: grade})
  }
  setExamGrade(examGrade : any, examid : any)
  {
    let grade = new FormData()
    grade.append('grade',`${examGrade}`)
    console.log(grade.get('grade'))
    return this.http.post(`http://localhost:3000/exam/setExamGradeManual?exam=${examid}`,{grade : grade.get('grade')})
  }
}
