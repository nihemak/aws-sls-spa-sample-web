import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  public getIdToken(): string {
    const session: any = Auth.currentSession();
    return session['__zone_symbol__value']['idToken']['jwtToken'];
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

  public signOut() {
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
