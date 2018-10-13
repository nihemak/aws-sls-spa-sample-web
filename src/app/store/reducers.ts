import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import {
  getTodos as getTodosFromState,
  reducer as todoReducer,
  State as TodoState
} from './todo';

export interface AppState {
  todo: TodoState;
}

const getTodoState = createFeatureSelector<TodoState>('todo');
export const getTodos = createSelector(getTodoState, getTodosFromState);

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer
};
