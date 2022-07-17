import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteQuestionBankService {
  
  url="http://localhost:3000/questionBank/deleteQuestionBank"
  constructor(private http : HttpClient) { }
  deleteQuestionBank(id:any)
  {
    return this.http.delete(`http://localhost:3000/questionBank/deleteQuestionBank?questionBank=${id}`)
  }
}
