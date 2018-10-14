import { Action } from '@ngrx/store';
import { Todo } from '../todo';

/**
 * Action
 */
export const FIND_ALL         = '[Todo] Find All';
export const FIND_ALL_SUCCESS = '[Todo] Find All Success';
export const FIND_ALL_FAIL    = '[Todo] Find All Fail';
export const CREATE           = '[Todo] Create';
export const CREATE_SUCCESS   = '[Todo] Create Success';
export const CREATE_FAIL      = '[Todo] Create Fail';
export const DONE             = '[Todo] Done';
export const DONE_SUCCESS     = '[Todo] Done Success';
export const DONE_FAIL        = '[Todo] Done Fail';
export const UPDATE           = '[Todo] Update';
export const UPDATE_SUCCESS   = '[Todo] Update Success';
export const UPDATE_FAIL      = '[Todo] Update Fail';
export const DELETE           = '[Todo] Delete';
export const DELETE_SUCCESS   = '[Todo] Delete Success';
export const DELETE_FAIL      = '[Todo] Delete Fail';

interface TodoAction extends Action {
  readonly payload?: any;
}

export class FindAll implements TodoAction {
  readonly type = FIND_ALL;
  constructor(public payload?: any) {}
}

export class FindAllSuccess implements TodoAction {
  readonly type = FIND_ALL_SUCCESS;
  constructor(public payload: { todos: Array<Todo> }) {}
}

export class FindAllFail implements TodoAction {
  readonly type = FIND_ALL_FAIL;
  constructor(public payload?: { error: any }) {}
}

export class Create implements TodoAction {
  readonly type = CREATE;
  constructor(public payload: { text: string }) {}
}

export class CreateSuccess implements TodoAction {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: { todo: Todo }) {}
}

export class CreateFail implements TodoAction {
  readonly type = CREATE_FAIL;
  constructor(public payload?: { error: any }) {}
}

export class Done implements TodoAction {
  readonly type = DONE;
  constructor(public payload: { id: string }) {}
}

export class DoneSuccess implements TodoAction {
  readonly type = DONE_SUCCESS;
  constructor(public payload: { todo: Todo | undefined }) {}
}

export class DoneFail implements TodoAction {
  readonly type = DONE_FAIL;
  constructor(public payload?: { error: any }) {}
}

export class Update implements TodoAction {
  readonly type = UPDATE;
  constructor(public payload: { id: string, text: string }) {}
}

export class UpdateSuccess implements TodoAction {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: { todo: Todo | undefined }) {}
}

export class UpdateFail implements TodoAction {
  readonly type = UPDATE_FAIL;
  constructor(public payload?: { error: any }) {}
}

export class Delete implements TodoAction {
  readonly type = DELETE;
  constructor(public payload: { id: string }) {}
}

export class DeleteSuccess implements TodoAction {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: { id: string }) {}
}

export class DeleteFail implements TodoAction {
  readonly type = DELETE_FAIL;
  constructor(public payload?: { error: any }) {}
}

/**
 * State
 */
export interface State {
  readonly todos: Array<Todo>;
}

export const getTodos = (state: State) => state.todos;

const initialState: State = {
  todos: []
};

/**
 * reducer
 */
export function reducer(state: State = initialState, action: TodoAction): State {
  switch (action.type) {
    case FIND_ALL_SUCCESS: {
      return { ...state, todos: action.payload.todos };
    }
    case CREATE_SUCCESS: {
      return { ...state, todos: [...state.todos, action.payload.todo] };
    }
    case DONE_SUCCESS:
    case UPDATE_SUCCESS: {
      const updateTodo = (todo: Todo) => {
        return todo.id === action.payload.todo.id ? action.payload.todo : todo;
      };

      return { ...state, todos: action.payload.todo ? state.todos.map(updateTodo) : state.todos };
    }
    case DELETE_SUCCESS: {
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id) };
    }
    case FIND_ALL:
    case FIND_ALL_FAIL:
    case CREATE:
    case CREATE_FAIL:
    case DONE:
    case DONE_FAIL:
    case UPDATE:
    case UPDATE_FAIL:
    case DELETE:
    case DELETE_FAIL:
    default:
      return { ...state };
  }
}
