import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login({ username, password }: { username: string; password: string }) {
    return lastValueFrom(
      this.http.get('http://localhost:3000/auth/login', {
        params: { username, password },
        withCredentials: true,
      })
    );
  }
}
