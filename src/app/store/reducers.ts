import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import {
  State as TodoState,
  reducer as todoReducer,
  getTodos as getTodosFromState
} from './todo';

export interface AppState {
  todo: TodoState;
}

const getTodoState = createFeatureSelector<TodoState>('todo');
export const getTodos = createSelector(getTodoState, getTodosFromState);

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer
};
