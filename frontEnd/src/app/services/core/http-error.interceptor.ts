import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private spinnerService : SpinnerService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    this.spinnerService.show();
    return next.handle(request).pipe(
        finalize(() => this.spinnerService.hide())
    );
  }
 
}