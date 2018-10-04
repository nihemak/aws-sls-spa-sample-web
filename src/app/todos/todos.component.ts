import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos?: Array<Todo>;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService
      .getTodos()
      .subscribe(todos => this.todos = todos);
  }

  trackByTodos(_index: number, todo: Todo): number | undefined {
    return todo.id;
  }
}
