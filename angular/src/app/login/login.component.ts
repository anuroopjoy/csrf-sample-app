import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  constructor(
    private loginService: LoginService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    console.log(platformId);
    if (isPlatformBrowser(platformId)) {
      console.log('Browser Only');
    }
    if (isPlatformServer(platformId)) {
      console.log('Server Only');
    }
  }

  async login() {
    if (!(!!this.username && !!this.password)) {
      this.errorMessage = 'Please fill all fields';
      return;
    }
    try {
      const result = await this.loginService.login({
        username: this.username,
        password: this.password,
      });
      if (result) {
        this.router.navigateByUrl('/home');
      } else {
        this.errorMessage = 'Invalid Login';
      }
    } catch (er) {
      this.errorMessage = 'Login Failed';
    }
  }
}
