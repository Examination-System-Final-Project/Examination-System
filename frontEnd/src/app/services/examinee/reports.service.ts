import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http : HttpClient) {}
  GetStudentExams(id : any ){
    return this.http.get(`http://localhost:3000/evaluation/getAllExamEvaluationStatsForExaminee?examinee=${id}`)   
  }
  getExamQuestion(id:any,examniee:any){
    return this.http.get(`http://localhost:3000/evaluation/getEachQuestionEvaluationStats?exam=${id}&examinee=${examniee}`)  
  }
  getInstructorExams(id:any){
    return this.http.get (`http://localhost:3000/evaluation/getInstructorExams?instructor=${id}`)   
  }
  previewExamReport(exam:any){
    return this.http.get (`http://localhost:3000/evaluation/getExamEvaluationStatsForEachExaminee?instructor=9&exam=${exam}`)   
  }
  
}
