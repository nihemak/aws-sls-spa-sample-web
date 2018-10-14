import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
    private store: Store<AppState>
  ) {
    this.todos$ = store.pipe(select(getTodos));
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.store.dispatch(new TodoFindAll());
  }

  addTodo(text: string): void {
    this.store.dispatch(new TodoCreate({ text }));
  }

  doneTodo(id: string): void {
    this.store.dispatch(new TodoDone({ id }));
  }

  deleteTodo(id: string): void {
    this.store.dispatch(new TodoDelete({ id }));
  }

  trackByTodos(_index: number, todo: Todo): string | undefined {
    return todo.id;
  }
}
