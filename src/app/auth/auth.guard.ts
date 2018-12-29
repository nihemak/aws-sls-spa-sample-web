import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.isAuthenticated()
        .pipe(
          tap(loggedIn => {
            if (!loggedIn) {
              this.router.navigate(['/login'])
                .catch((error: any) => {
                  console.warn(error);
                });
            }
          })
        );
  }
}
