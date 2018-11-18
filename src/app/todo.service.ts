import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = `${environment.apiBaseUrl}/`;

  constructor(private http: HttpClient) { }

  getTodos(token: string): Observable<Array<Todo>> {
    const url = `${this.baseUrl}v1/todos`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };

    return this.http.get<Array<Todo>>(url, httpOptions);
  }

  getTodo(token: string, id: string): Observable<Todo|undefined> {
    const url = `${this.baseUrl}v1/todos/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };

    return this.http.get<Todo>(url, httpOptions);
  }

  addTodo(token: string, text: string): Observable<Todo> {
    const url = `${this.baseUrl}v1/todos`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    const todo = { text };

    return this.http.post<Todo>(url, todo, httpOptions);
  }

  updateTodo(token: string, id: string, text: string): Observable<Todo|undefined> {
    const url = `${this.baseUrl}v1/todos/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    const todo = { text };

    return this.http.put<Todo>(url, todo, httpOptions);
  }

  doneTodo(token: string, id: string): Observable<Todo|undefined> {
    const url = `${this.baseUrl}v1/todos/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    const todo = { checked: true };

    return this.http.put<Todo>(url, todo, httpOptions);
  }

  deleteTodo(token: string, id: string): Observable<{ id: string }> {
    const url = `${this.baseUrl}v1/todos/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };

    return this.http.delete<{ id: string }>(url, httpOptions);
  }
}
