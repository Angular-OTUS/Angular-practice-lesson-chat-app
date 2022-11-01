import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user: string|null = null;

  constructor(private router: Router) {}

  getUser() {
    return this.user;
  }

  login(name: string) {
    this.user = name;
  }

  isLoggedIn() {
    return this.user != null;
  }

  logout() {
    this.router.navigate(['/']);
    this.user =null;
  }
}
