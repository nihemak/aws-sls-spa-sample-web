import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  title = 'Todos';
  subscription?: Subscription;
  username: String|null;
  public loggedIn?: boolean;

  constructor(
    public auth: AuthService, private cdr: ChangeDetectorRef
  ) {
    this.username = localStorage.getItem(
      `${environment.localstorageBaseKey}LastAuthUser`
    );
  }

  ngOnInit(): void {
    this.subscription = this.auth.isAuthenticated()
      .subscribe(result => {
        this.loggedIn = result;
      });
  }

  ngAfterViewChecked(): void {
    this.username = localStorage.getItem(
      `${environment.localstorageBaseKey}LastAuthUser`
    );
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClickLogout(): void {
    this.auth.signOut();
  }
}
