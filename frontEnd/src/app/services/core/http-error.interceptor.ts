import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private spinnerService : SpinnerService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    this.spinnerService.requestStarted()
    return this.handler(next,request);
  }
  handler(next :any ,request : any)
  {
    return next.handle(request).pipe(tap(
      (event)=>{
        if(event instanceof HttpResponse)
        {
            this.spinnerService.requestEnded()
        }
      },
      (error : HttpErrorResponse)=>{
        this.spinnerService.resetSpinner()
        throw error
      }
    ))
  }
}
