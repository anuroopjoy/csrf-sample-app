import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public getToken(): string | null {
    return localStorage.getItem('at');
  }

  public setToken(token: string) {
    localStorage.setItem('at', token);
  }
}
