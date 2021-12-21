import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  login({ username, password }: { username: string; password: string }) {
    return lastValueFrom(
      this.http
        .get('http://localhost:3000/auth/login', {
          params: { username, password },
          withCredentials: true,
        })
        .pipe(
          tap(({ access_token }: any) =>
            this.authService.setToken(access_token)
          )
        )
    );
  }
}
