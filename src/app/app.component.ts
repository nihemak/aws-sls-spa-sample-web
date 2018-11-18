import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
