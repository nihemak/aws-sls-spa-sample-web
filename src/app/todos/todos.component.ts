import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../todo';
import { AppState, getTodos } from '../store/reducers';
import {
  FindAll as TodoFindAll,
  Create as TodoCreate,
  Done as TodoDone,
  Delete as TodoDelete
} from '../store/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;
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
    this.store.dispatch(new TodoCreate({ text: text }));
  }

  doneTodo(id: string): void {
    this.store.dispatch(new TodoDone({ id: id }));
  }

  deleteTodo(id: string): void {
    this.store.dispatch(new TodoDelete({ id: id }));
  }

  trackByTodos(_index: number, todo: Todo): string | undefined {
    return todo.id;
  }
}
