import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { reducers } from './store/reducers';
import { TodoEffects } from './store/todo.effect';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoEditorComponent } from './todo-editor/todo-editor.component';

import { environment } from '../environments/environment';
import { MockWebApiService } from './mock-web-api.service';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';

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
  providers: [MockWebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
