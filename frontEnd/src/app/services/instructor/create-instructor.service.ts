import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateInstructorService {
  url='http://localhost:3000/instructor/addInstructor';
  constructor(private http : HttpClient) { }
  saveInstructor(data : any)
  {
     return this.http.post(this.url,data)
  }
  listExams (id : any){

  return this.http.get(`http://localhost:3000/instructor/listInstructorExams?instructor=${id}`)  }
  deleteExam(data:any){
    return this.http.delete(`http://localhost:3000/exam/deleteExam?exam=${data}`)
  }
  deleteUniqueExam(data:any){
    return this.http.delete(`http://localhost:3000/exam/deleteUniqueExam?exam=${data}`)
  }
}
