import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todo: Todo = {
    id: 1,
    text: "test todo"
  };

  constructor() { }

  ngOnInit() {
  }

}
