import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url='http://localhost:3000/auth/login';
  // headers= new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  constructor(private http : HttpClient) { }
  authenticate(data : any){
    console.log(data);
    return this.http.post(this.url, data,{
      observe:'body',
      withCredentials:true,
      // headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
