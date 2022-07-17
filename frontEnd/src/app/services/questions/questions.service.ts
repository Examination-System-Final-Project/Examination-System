import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { questionBank} from '../../models/questionBank'
import { PreviewQuestionBankComponent } from 'src/app/view/pages/preview-question-bank/preview-question-bank.component';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  url ='http://localhost:3000/questions/createQuestionMcq?id=1'
  questionID!:any
  questionbankID:any
  constructor(private http : HttpClient) { }
  createMcq(data : any,id:any)
  {
    return this.http.post(`http://localhost:3000/questions/createQuestionMcq?questionBank=${id}`,data)
  }
  listQuestions(id:any)
  {
    return this.http.get(`http://localhost:3000/questions/listQuestions?questionBank=${id}`)
  }
  createTF(data : any, id:any)
  {
    return this.http.post(`http://localhost:3000/questions/createQuestionTF?questionBank=${id}`,data)
  }
  createEssay(data : any, id: any )
  {
    return this.http.post(`http://localhost:3000/questions/createQuestionEssay?questionBank=${id}`,data)
  }
  getQuestionOfID(id:any)
  {
    return this.http.get(`http://localhost:3000/questions/listQuestionInfo?question=${id}`) 
  }
  getID()
  {
    return this.questionID;
  }
  editQuestion(id:any,data:any)
  {
    return this.http.put(`http://localhost:3000/questions/editQuestion?question=${id}`,data)
  }
  deleteQuestion(id:any)
  {
    return this.http.delete(`http://localhost:3000/questions/deleteQuestion?question=${id}`)
  }
  
    questionBankID()
  {
    return this.questionbankID
  }
  
}
