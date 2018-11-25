import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';

export interface IAuthService {
  signUp(email: string, password: string): Observable<any>;
  confirmSignUp(email: string, code: string): Observable<any>;
  signIn(email: string, password: string): Observable<any>;
  getData(): Observable<any>;
  getIdToken(): Promise<string>;
  isAuthenticated(): Observable<boolean>;
  signOut(): void;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  public loggedIn: BehaviorSubject<boolean>;
  password!: String;

  constructor(
    private router: Router
  ) {
    Amplify.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public signUp(email: string, password: string): Observable<any> {
    this.password = password;

    return from(Auth.signUp(email, password, email));
  }

  public confirmSignUp(email: string, code: string): Observable<any> {
    return from(Auth.confirmSignUp(email, code));
  }

  public signIn(email: string, password: string): Observable<any> {
    return from(Auth.signIn(email, password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  public getData(): Observable<any> {
    return from(Auth.currentAuthenticatedUser());
  }

  public getIdToken(): Promise<string> {
    return Auth.currentSession()
      .then(session => {
        return session.getIdToken()
          .getJwtToken();
      });
  }

  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        map(_result => {
          this.loggedIn.next(true);

          return true;
        }),
        catchError(_error => {
          this.loggedIn.next(false);

          return of(false);
        })
      );
  }

  public signOut(): void {
    from(Auth.signOut())
      .subscribe(
        _result => {
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
        },
        error => console.log(error)
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class MockAuthService implements IAuthService {
  public loggedIn: BehaviorSubject<boolean>;
  password!: String;
  idSignIn = false;

  constructor(
    private router: Router
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public signUp(_email: string, password: string): Observable<any> {
    this.password = password;

    return of(true);
  }

  public confirmSignUp(_email: string, _code: string): Observable<any> {
    return of(true);
  }

  public signIn(_email: string, _password: string): Observable<any> {
    this.idSignIn = true;

    return of([])
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  public getData(): Observable<any> {
    return of([]);
  }

  public getIdToken(): Promise<string> {
    return Promise.resolve('dummyToken');
  }

  public isAuthenticated(): Observable<boolean> {
    this.loggedIn.next(this.idSignIn);

    return of(this.idSignIn);
  }

  public signOut(): void {
    this.idSignIn = false;
    this.loggedIn.next(this.idSignIn);
    this.router.navigate(['/login']);
  }
}
