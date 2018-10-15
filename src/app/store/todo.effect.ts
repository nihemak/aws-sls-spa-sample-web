import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { TodoService } from '../todo.service';
import {
  CREATE,
  Create,
  CreateFail,
  CreateSuccess,
  Delete,
  DELETE,
  DeleteFail,
  DeleteSuccess,
  DONE,
  Done,
  DoneFail,
  DoneSuccess,
  FIND_ALL,
  FindAll,
  FindAllFail,
  FindAllSuccess,
  UPDATE,
  Update,
  UpdateFail,
  UpdateSuccess
} from './todo';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) { }

  @Effect() findAll$: Observable<Action> = this.actions$.pipe(
    ofType<FindAll>(FIND_ALL),
    switchMap(_action => {

      return this.todoService
        .getTodos()
        .pipe(
          map(todos => new FindAllSuccess({ todos })),
          catchError(error => of(new FindAllFail({ error })))
        );
    })
  );

  @Effect() create$: Observable<Action> = this.actions$.pipe(
    ofType<Create>(CREATE),
    concatMap(action => {
      const { text } = action.payload;

      return this.todoService
        .addTodo(text)
        .pipe(
          map(todo => new CreateSuccess({ todo })),
          catchError(error => of(new CreateFail({ error })))
        );
    })
  );

  @Effect() done: Observable<Action> = this.actions$.pipe(
    ofType<Done>(DONE),
    concatMap(action => {
      const { id } = action.payload;

      return this.todoService
        .doneTodo(id)
        .pipe(
          map(todo => new DoneSuccess({ todo })),
          catchError(error => of(new DoneFail({ error })))
        );
    })
  );

  @Effect() update: Observable<Action> = this.actions$.pipe(
    ofType<Update>(UPDATE),
    concatMap(action => {
      const { id, text } = action.payload;

      return this.todoService
        .updateTodo(id, text)
        .pipe(
          map(todo => new UpdateSuccess({ todo })),
          catchError(error => of(new UpdateFail({ error })))
        );
    })
  );

  @Effect() delete: Observable<Action> = this.actions$.pipe(
    ofType<Delete>(DELETE),
    concatMap(action => {
      const { id } = action.payload;

      return this.todoService
        .deleteTodo(id)
        .pipe(
          map(todo => new DeleteSuccess({ id: todo.id })),
          catchError(error => of(new DeleteFail({ error })))
        );
    })
  );
}
