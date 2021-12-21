import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
  #headerName = 'X-XSRF-TOKEN';
  constructor(private tokenService: HttpXsrfTokenExtractor) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !request.headers.has(this.#headerName)) {
      request = request.clone({
        headers: request.headers.set(this.#headerName, token),
      });
    }
    return next.handle(request);
  }
}
