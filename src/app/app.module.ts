import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { reducers } from './store/reducers';
import { TodoEffects } from './store/todo.effect';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoEditorComponent } from './todo-editor/todo-editor.component';

import { MockWebApiService } from './mock-web-api.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects]),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MockWebApiService)
  ],
  providers: [MockWebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
