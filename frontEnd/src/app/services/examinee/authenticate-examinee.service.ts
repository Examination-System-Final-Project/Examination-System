import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateExamineeService {
  url='http://localhost:3000/auth/examineeLogin';
  constructor(private http : HttpClient) { }
  authenticate(data:any)
  {
    return this.http.post(this.url,data);
  }
}
