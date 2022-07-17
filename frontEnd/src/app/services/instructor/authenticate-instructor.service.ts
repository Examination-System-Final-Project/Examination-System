import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateInstructorService {
  url='http://localhost:3000/auth/instructorLogin';
  constructor(private http : HttpClient) { }
  authenticateLogin(data:any)
  {
    return this.http.post(this.url,data);
  }
}
