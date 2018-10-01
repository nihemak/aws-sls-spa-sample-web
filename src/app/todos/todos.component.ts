import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TODOS } from '../mock-todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos = TODOS;
  selectedTodo?: Todo;

  constructor() { }

  ngOnInit() {
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }
}
