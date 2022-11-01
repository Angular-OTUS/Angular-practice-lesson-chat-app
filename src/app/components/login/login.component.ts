import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from "../../services";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const name = this.form.controls.name.value;

    this.authService.login(name);
    this.router.navigate(['/chat']);
  }
}
