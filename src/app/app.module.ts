import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { reducers } from './store/reducers';
import { TodoEffects } from './store/todo.effect';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoEditorComponent } from './todo-editor/todo-editor.component';
import { TodosComponent } from './todos/todos.component';

import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { MockWebApiService } from './mock-web-api.service';

import { AuthService, AuthServiceBasic, MockAuthService } from './auth/auth.service';

const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  AppRoutingModule,
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot([TodoEffects]),
  HttpClientModule
];
if (environment.apiBaseUrl === 'mock-server') {
  imports.push(HttpClientInMemoryWebApiModule.forRoot(MockWebApiService));
}

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoEditorComponent,
    LoginComponent,
    SignupComponent
  ],
  imports,
  providers: [
    MockWebApiService,
    {
      provide: AuthService,
      useClass: environment.amplify.Auth.userPoolId === 'Dummy' ? MockAuthService : AuthServiceBasic
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
