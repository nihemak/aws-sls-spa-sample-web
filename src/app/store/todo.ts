import { Action } from '@ngrx/store';
import { Todo } from '../todo';
import { TODOS } from '../mock-todos';
import * as UUID from 'uuid';

/**
 * Action
 */
const FIND_ALL = '[Todo] Find All';
const CREATE   = '[Todo] Create';
const DONE     = '[Todo] Done';
const UPDATE   = '[Todo] Update';
const DELETE   = '[Todo] Delete';

interface TodoAction extends Action {
  readonly payload?: any;
}

export class FindAll implements TodoAction {
  readonly type = FIND_ALL;
  constructor(public payload?: any) {}
}

export class Create implements TodoAction {
  readonly type = CREATE;
  constructor(public payload: { text: string }) {}
}

export class Done implements TodoAction {
  readonly type = DONE;
  constructor(public payload: { id: string }) {}
}

export class Update implements TodoAction {
  readonly type = UPDATE;
  constructor(public payload: { id: string, text: string }) {}
}

export class Delete implements TodoAction {
  readonly type = DELETE;
  constructor(public payload: { id: string }) {}
}

/**
 * State
 */
export interface State {
  readonly todos: Array<Todo>;
}

export const getTodos = (state: State) => state.todos;

const initialState: State = {
  todos: [...TODOS]
};

/**
 * reducer
 */
export function reducer(state: State = initialState, action: TodoAction): State {
  switch (action.type) {
    case FIND_ALL: {
      return { ...state };
    }
    case CREATE: {
      const newTodo = {
        id: UUID.v4(),
        text: action.payload.text,
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      };

      return { ...state, todos: [...state.todos, newTodo] };
    }
    case DONE: {
      const newTodos = state.todos.map(todo => {
        let newTodo = todo;
        if (todo.id == action.payload.id) {
          newTodo = { ...todo, checked: true, updatedAt: new Date().getTime() };
        }

        return newTodo;
      });

      return { ...state, todos: newTodos };
    }
    case UPDATE: {
      const newTodos = state.todos.map(todo => {
        let newTodo = todo;
        if (todo.id == action.payload.id) {
          newTodo = { ...todo, text: action.payload.text, updatedAt: new Date().getTime() };
        }

        return newTodo;
      });

      return { ...state, todos: newTodos };
    }
    case DELETE: {
      const newTodos = state.todos.filter(todo => todo.id !== action.payload.id);

      return { ...state, todos: newTodos };
    }
    default:
      return state;
  }
}
