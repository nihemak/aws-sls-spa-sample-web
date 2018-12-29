import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Todo } from '../todo';

import { AppState, getTodos } from '../store/reducers';
import {
  Create as TodoCreate,
  Delete as TodoDelete,
  Done as TodoDone,
  FindAll as TodoFindAll
} from '../store/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos$: Observable<Array<Todo>>;
  showDone = false;

  constructor(
    private readonly store: Store<AppState>,
    private readonly authService: AuthService
  ) {
    this.todos$ = store.pipe(select(getTodos));
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.authService.getIdToken()
      .then(token => {
        this.store.dispatch(new TodoFindAll({ token }));
      })
      .catch((error: any) => {
        console.warn(error);
      });
  }

  addTodo(text: string): void {
    this.authService.getIdToken()
      .then(token => {
        this.store.dispatch(new TodoCreate({ token, text }));
      })
      .catch((error: any) => {
        console.warn(error);
      });
  }

  doneTodo(id: string): void {
    this.authService.getIdToken()
      .then(token => {
        this.store.dispatch(new TodoDone({ token, id }));
      })
      .catch((error: any) => {
        console.warn(error);
      });
  }

  deleteTodo(id: string): void {
    this.authService.getIdToken()
      .then(token => {
        this.store.dispatch(new TodoDelete({ token, id }));
      })
      .catch((error: any) => {
        console.warn(error);
      });
  }

  trackByTodos(_index: number, todo: Todo): string | undefined {
    return todo.id;
  }
}
