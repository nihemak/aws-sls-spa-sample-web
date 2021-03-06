import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitLogin(value: any): void {
    const email = value.email;
    const password = value.password;
    this.auth.signIn(email, password)
      .subscribe(
        _result => {
          this.router.navigate(['/'])
            .catch((error: any) => {
              console.warn(error);
            });
        },
        error => {
          console.log(error);
        });
  }
}
