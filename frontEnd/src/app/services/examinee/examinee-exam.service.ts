import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExamineeExamService {
 Duration : any
 flag : boolean =false
  constructor(private http : HttpClient) { }
  storeExamineeAnswer(examID:any,examineeID:any,questionID:any,answer:any)
  {
    
    // console.log(answer)
    return this.http.post(`http://localhost:3000/examinee/storeExamineeAnswer?examinee=${examineeID}&exam=${examID}&question=${questionID}`,answer)
  }
  sendAnswersForEvaluation(examID:any,examineeID:any)
  {
    return this.http.get(`http://localhost:3000/exam/evaluateExamineeAnswers?exam=${examID}&examinee=${examineeID}`)
  }
  evaluateExam(examID:any,examineeID:any)
  {
    return this.http.get(`http://localhost:3000/evaluation/evaluateExam?exam=${examID}&examinee=${examineeID}`)
  }
  evaluationStats(examID:any,examineeID:any)
  {
    return this.http.get(`http://localhost:3000/evaluation/getExamEvaluationStats?exam=${examID}&examinee=${examineeID}`)
  }
}
