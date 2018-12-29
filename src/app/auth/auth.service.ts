import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Amplify, { Auth } from 'aws-amplify';

import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';

export abstract class AuthService {
  abstract signUp(email: string, password: string): Observable<any>;
  abstract confirmSignUp(email: string, code: string): Observable<any>;
  abstract signIn(email: string, password: string): Observable<any>;
  abstract getData(): Observable<any>;
  abstract getIdToken(): Promise<string>;
  abstract isAuthenticated(): Observable<boolean>;
  abstract signOut(): void;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceBasic extends AuthService {
  public loggedIn: BehaviorSubject<boolean>;
  password!: String;

  constructor(
    private readonly router: Router
  ) {
    super();
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
          this.router.navigate(['/login'])
            .catch((error: any) => {
              console.warn(error);
            });
        },
        error => console.log(error)
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class MockAuthService extends AuthService {
  public loggedIn: BehaviorSubject<boolean>;
  password!: String;
  idSignIn = false;

  constructor(
    private readonly router: Router
  ) {
    super();
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
    this.router.navigate(['/login'])
      .catch((error: any) => {
        console.warn(error);
      });
  }
}
