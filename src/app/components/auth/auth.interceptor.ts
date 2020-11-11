import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './service/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(request).pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'A unknow error Occured';
    const { error: serverError } = error;
    if (serverError && serverError.message) {
      errorMsg = serverError.message;
    }
    this.toastrService.error(errorMsg, 'ERROR !!!', { timeOut: 2500 });
    return throwError(error);
  }
}
