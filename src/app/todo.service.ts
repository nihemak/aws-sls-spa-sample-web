import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';
import * as UUID from 'uuid';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'mock-server/';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Array<Todo>> {
    const url = this.baseUrl + 'todos';
    return this.http.get<Todo[]>(url)
  }

  getTodo(id: string): Observable<Todo|undefined> {
    const url = this.baseUrl + 'todos/' + id;
    return this.http.get<Todo>(url)
  }

  addTodo(text: string): Observable<Todo> {
    const url = this.baseUrl + 'todos';
    const todo = {
      id: UUID.v4(),
      text,
      checked: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    };
    return this.http.post<Todo>(url, todo);
  }

  updateTodo(id: string, text: string): Observable<Todo|undefined> {
    const url = this.baseUrl + 'todos';
    const todo = {
      id,
      text: text,
      updatedAt: new Date().getTime()
    };
    return this.http.put<Todo>(url, todo, httpOptions);
  }

  doneTodo(id: string): Observable<Todo|undefined> {
    const url = this.baseUrl + 'todos';
    const todo = {
      id,
      checked: true,
      updatedAt: new Date().getTime()
    };
    return this.http.put<Todo>(url, todo, httpOptions);
  }

  deleteTodo(id: string): Observable<string> {
    const url = this.baseUrl + 'todos/' + id;
    return this.http.delete<string>(url, httpOptions);
  }
}
