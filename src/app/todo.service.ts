import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo';
import { TODOS } from './mock-todos';
import * as UUID from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Observable<Array<Todo>> {
    return of(TODOS);
  }

  getTodo(id: string): Observable<Todo|undefined> {
    return of(TODOS.find(todo => todo.id === id));
  }

  addTodo(newTodo: string): void {
    TODOS.push({ id: UUID.v4(), text: newTodo });
  }
}
