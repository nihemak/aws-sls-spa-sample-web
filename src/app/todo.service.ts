import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo';
import { TODOS } from './mock-todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Observable<Array<Todo>> {
    return of(TODOS);
  }

  getTodo(id: number): Observable<Todo|undefined> {
    return of(TODOS.find(todo => todo.id === id));
  }
}
