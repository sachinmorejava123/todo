import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}
@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss'],
})
export class ListTodosComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = [
    'id',
    'description',
    'targetDate',
    'isCompleted',
    'update',
    'delete',
  ];
  todoData: Todo[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  todos: Todo[];
  message: any;

  constructor(
    private todoService: TodoDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Todo>(this.todoData);
    this.dataSource.paginator = this.paginator;
    this.retriveAllTodos();
  }

  retriveAllTodos() {
    this.todoService.retriveAllTodos().subscribe((response) => {
      this.todos = response;
      this.todoData = response;
      this.dataSource = new MatTableDataSource<Todo>(this.todoData);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id).subscribe((resp) => {
      this.message = `Delete of Todo ${id}`;
      this.openSnackBar();
      this.retriveAllTodos();
    });
  }

  updateTodo(id) {
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }

  openSnackBar() {
    this.snackBar.open(`${this.message}`, 'Successfull !', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
