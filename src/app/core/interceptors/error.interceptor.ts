import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorRes: HttpErrorResponse) => {
        let message = 'An unknown error occurred!';
        if (errorRes.status === 500 || errorRes.status === 404) {
          message = `${errorRes.status} - ${errorRes.message}`;
        }
        return throwError(() => message);
      })
    );
  }
}
