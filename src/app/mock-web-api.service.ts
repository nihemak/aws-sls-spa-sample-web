import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Todo } from './todo';
import { TODOS } from './mock-todos';
import * as UUID from 'uuid';

@Injectable()
export class MockWebApiService implements InMemoryDbService {
  private api: any = {
    todos: TODOS
  }

  public createDb(): any {
    return this.api;
  }

  genId(_todos: Todo[]): string {
    return UUID.v4();
  }

  public responseInterceptor(responseOptions: any, requestInfo: any): any {
    if (requestInfo.collectionName === 'todos' &&
        requestInfo.method === 'put' &&
        responseOptions.status === 204) {
      responseOptions.body = requestInfo.collection.find((todo: Todo) => todo.id === requestInfo.id);
    }
    if (requestInfo.collectionName === 'todos' &&
        requestInfo.method === 'delete' &&
        responseOptions.status === 204) {
      responseOptions.body = requestInfo.id;
    }
    return responseOptions;
  }
}
