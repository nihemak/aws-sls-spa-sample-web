import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo';
import { TODOS } from './mock-todos';
import * as UUID from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private static todos: Array<Todo> = TODOS;

  constructor() { }

  getTodos(): Observable<Array<Todo>> {
    return of(TodoService.todos);
  }

  getTodo(id: string): Observable<Todo|undefined> {
    return of(TodoService.todos.find(todo => todo.id === id));
  }

  addTodo(text: string): Observable<Todo> {
    const newTodo = {
      id: UUID.v4(),
      text,
      checked: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    };
    TodoService.todos = [...TodoService.todos, newTodo];

    return of(newTodo);
  }

  updateTodo(id: string, text: string): Observable<Todo|undefined> {
    let newTodo;
    TodoService.todos = TodoService.todos.map(todo => {
      if (todo.id === id) {
        todo = { ...todo, text, updatedAt: new Date().getTime() };
        newTodo = todo;
      }

      return todo;
    });

    return of(newTodo);
  }

  doneTodo(id: string): Observable<Todo|undefined> {
    let newTodo;
    TodoService.todos = TodoService.todos.map(todo => {
      if (todo.id === id) {
        todo = { ...todo, checked: true, updatedAt: new Date().getTime() };
        newTodo = todo;
      }

      return todo;
    });

    return of(newTodo);
  }

  deleteTodo(id: string): Observable<string> {
    TodoService.todos = TodoService.todos.filter(todo => todo.id !== id);

    return of(id);
  }
}
