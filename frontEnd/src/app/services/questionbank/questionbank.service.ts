import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders  } from '@angular/common/http';
import { questionBank } from 'src/app/models/questionBank';
@Injectable({
  providedIn: 'root'
})
export class QuestionbankService  {
  
  qb !: questionBank
  apiurl_des='http://localhost:3000/questionBank/listQuestionBanks?id=1' ;
  create_question_bank_url= `http://localhost:3000/questionBank/createQuestionBank?id=1`;
    
   
//   params= new HttpParams()
//  .set('id',1)
  constructor(private http:HttpClient) {

    }
  // QuestionBankId: Number;
  // QuestionBankName: String;
  // InstructorId: Number;
    loaddes(id : any){
      return this.http.get(`http://localhost:3000/questionBank/listQuestionBanks?id=${id}`) ;
   }
   createQuestionBank(data:any, id : any)
   {
     return this.http.post(`http://localhost:3000/questionBank/createQuestionBank?id=${id}`,data)
   }
}
