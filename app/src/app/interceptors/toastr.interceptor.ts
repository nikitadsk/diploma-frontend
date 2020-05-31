import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class ToastrInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {
            this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-top-right'});
          }
        }
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-top-right' });
          } catch (e) {
            this.toasterService.error('Произошла ошибка', '', { positionClass: 'toast-top-right' });
          }
        }
        return of(err);
      })
    );
  }
}
