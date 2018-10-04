import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todos: Array<Todo> = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService
      .getTodos()
      .subscribe(todos => this.todos = todos.slice(1, 5));
  }

  trackByTodos(_index: number, todo: Todo): number | undefined {
    return todo.id;
  }
}
