import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.scss']
})
export class TodoEditorComponent implements OnInit {
  @Input() todo?: Todo;
  text = new FormControl('');

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    if (this.todo) {
      this.text.setValue(this.todo.text);
    }
  }

  updateText() {
    if (this.todo && this.todo.id) {
      this.todoService.updateTodo(this.todo.id, this.text.value);
    }
  }
}
