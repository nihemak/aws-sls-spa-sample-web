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

  addTodo(newTodo: string): void {
    TodoService.todos.push({
      id: UUID.v4(),
      text: newTodo,
      checked: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });
  }

  updateTodo(id: string, text: string): void {
    TodoService.todos = TodoService.todos.map(todo => {
      if (todo.id === id) {
        todo.text = text;
        todo.updatedAt = new Date().getTime();
      }
      return todo;
    });
  }

  doneTodo(id: string): void {
    TodoService.todos = TodoService.todos.map(todo => {
      if (todo.id === id) {
        todo.checked = true;
        todo.updatedAt = new Date().getTime();
      }
      return todo;
    });
  }

  deleteTodo(id: string): void {
    TodoService.todos = TodoService.todos.filter(todo => todo.id !== id);
  }
}
