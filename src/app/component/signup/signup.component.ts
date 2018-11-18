import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm?: FormGroup;
  public confirmationForm?: FormGroup;
  public successfullySignup?: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.confirmationForm = this.fb.group({
      email: ['', Validators.required],
      confirmationCode: ['', Validators.required]
    });
  }

  onSubmitSignup(value: any): void {
    const email = value.email, password = value.password;
    this.auth.signUp(email, password)
      .subscribe(
        _result => {
          this.successfullySignup = true;
        },
        error => {
          console.log(error);
        });
  }

  onSubmitConfirmation(value: any): void {
    const email = value.email, confirmationCode = value.confirmationCode;
    this.auth.confirmSignUp(email, confirmationCode)
      .subscribe(
        _result => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        });
  }
}
