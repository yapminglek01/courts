import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
        catchError((res) => {
            if(res.error.data === 'jwt expired'){
              Swal.mixin({
              icon: 'error',
              showCancelButton: false,
              showConfirmButton: false,
              heightAuto: false,
              timer: 3000,
              }).fire({
                title: 'Session timed out',
                text: 'Please re-login to continue',
              }).then(() => {
                this.router.navigate(['login']);
                this.auth.logout();
              })
              throw new Error(res);
            }
            return throwError(res)
          })
    )
  }
}