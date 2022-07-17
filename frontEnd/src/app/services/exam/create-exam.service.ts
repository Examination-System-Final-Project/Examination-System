import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CreateExamService {
  url='http://localhost:3000/exam/createExam?instructor=9&organization=1';
  examIdForEdit:any ;
  examIdForadding:any ;
  questiongrade:any ;
  qesid:any ;
  examIdForAutoGeneration:any;
  step=2
  constructor(private http : HttpClient) { }
  createExam(data : any )
  {
     return this.http.post(`http://localhost:3000/exam/createExam?instructor=9&organization=1`,data)
  }
  getQuestionOfExamID(id:any)
  {
  
    
      return this.http.get(`http://localhost:3000/exam/listExamInfo?exam=${id}`) 
    
  }
editExam(id:any,data:any){
  return this.http.put(`http://localhost:3000/exam/editExam?exam=${id}`,data) 
}
generateAudioFiles(id:any){
  return this.http.get(`http://localhost:3000/exam/generateQuestionsAudioFiles?question=${id}`) 

}
listExamQuestions(id:any){
  return this.http.get(`http://localhost:3000/exam/listExamQuestions?exam=${id}`)   
}
deleteQuestionInExam(examId:any,QuestionId:any){
return this.http.delete(`http://localhost:3000/exam/removeQuestionFromExam?exam=${examId}&question=${QuestionId}`)
}
editQuestionGrade(examId:any,QuestionId:any){
  return this.http.post(`http://localhost:3000/exam/editQuestionGrade?exam=${examId}&question=${this.qesid}`,this.questiongrade) 
}
listQuestionInQuestionBankNotInExam(questionbankid:any){
  return this.http.get(`http://localhost:3000/questions/listQuestionsInQuestionBankNotInExam?exam=${this.examIdForadding}&questionBank=${questionbankid}`)
}
autoExam(arrayOfQuestionBanks:any,mark:any,examId:any){
  return this.http.post(`http://localhost:3000/exam/examAutoCreation?exam=${examId}`,{arrayOfQuestionBanks:arrayOfQuestionBanks,mark:mark}) 
 
}
}