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
}
