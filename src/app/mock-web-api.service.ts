import { Injectable } from '@angular/core';

import { InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';

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

  public parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    const replacedUrl = url.replace('v1/todos', 'todos');
    return utils.parseRequestUrl(replacedUrl);
  }

  post(requestInfo: any): any {
    if (requestInfo.collectionName === 'todos') {
      requestInfo.req.body.checked = false;
      requestInfo.req.body.createdAt = new Date().getTime();
      requestInfo.req.body.updatedAt = new Date().getTime();
    }
  }

  put(requestInfo: any): any {
    if (requestInfo.collectionName === 'todos') {
      const todo = requestInfo.collection.find((todo: Todo) => todo.id === requestInfo.id);
      if (todo) {
        requestInfo.req.body.id = todo.id;
        if (! ('checked' in requestInfo.req.body)) {
          requestInfo.req.body.checked = todo.checked;
        }
        if (! ('text' in requestInfo.req.body)) {
          requestInfo.req.body.text = todo.text;
        }
        requestInfo.req.body.createdAt = todo.createdAt;
        requestInfo.req.body.updatedAt = new Date().getTime();
      }
    }
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
