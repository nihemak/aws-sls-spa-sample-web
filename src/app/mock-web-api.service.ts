import { Injectable } from '@angular/core';

import { InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';

import { Todo } from './todo';
import * as UUID from 'uuid';

@Injectable()
export class MockWebApiService implements InMemoryDbService {
  private api: any = {
    todos: [
      {
        id: 'bc55004d-6bf3-45ba-a785-a2c2b62b24d8',
        text: 'test todo1',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: '458b67c1-9263-4827-b0bf-6cf406a38c70',
        text: 'test todo2',
        checked: true,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: 'd2efc133-0f4f-4cbe-9c72-155b4efda4f0',
        text: 'test todo3',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: '6814e207-3ab0-41ce-92b3-174a2aa52b5d',
        text: 'test todo4',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: '0a8957bb-8268-4e80-874d-6cdb13cbfe06',
        text: 'test todo5',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: '11e2dcb6-11b9-41ad-b730-acca343b42cb',
        text: 'test todo6',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: '45daf5ca-e637-4649-a3ee-b88d8a24043b',
        text: 'test todo7',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: 'e9b606c8-435f-4b0e-906e-c67be0283090',
        text: 'test todo8',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: 'eb87bfce-d86f-40cb-8a2f-22bedd019f33',
        text: 'test todo9',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      },
      {
        id: '7e566865-f9d8-4091-984d-69a7af48ab43',
        text: 'test todo0',
        checked: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      }
    ]
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
