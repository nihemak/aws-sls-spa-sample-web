import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import { Todo } from '../todo';

import { AppState } from '../store/reducers';
import { Update as TodoUpdate } from '../store/todo';

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.scss']
})
export class TodoEditorComponent implements OnInit {
  @Input() todo?: Todo;
  text = new FormControl('');

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.todo) {
      this.text.setValue(this.todo.text);
    }
  }

  updateText(): void {
    this.authService.getIdToken()
      .then(token => {
        if (this.todo) {
          this.store.dispatch(new TodoUpdate({ token, id: this.todo.id, text: this.text.value }));
        }
      })
      .catch((error: any) => {
        console.warn(error);
      });
  }
}
