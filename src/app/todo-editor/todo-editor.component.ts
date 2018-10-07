import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    if (this.todo) {
      this.text.setValue(this.todo.text);
    }
  }

  updateText(): void {
    if (this.todo) {
      this.todoService.updateTodo(this.todo.id, this.text.value);
    }
  }
}
