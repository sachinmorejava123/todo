import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  todo: Todo;
  id: number;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.todo = new Todo(this.id, '', false, new Date());
    // tslint:disable-next-line: triple-equals
    if (this.id != -1) {
      this.todoService.retriveTodo(this.id).subscribe((data) => {
        this.todo = data;
      });
    }
  }

  saveTodo() {
    // tslint:disable-next-line: triple-equals
    if (this.id == -1) {
      this.todoService.createTodo(this.todo).subscribe((resp) => {
        this.router.navigate(['todos']);
      });
    } else {
      this.todoService.updateTodo(this.id, this.todo).subscribe((resp) => {
        this.openSnackBar(resp.id);
        this.router.navigate(['todos']);
      });
    }
  }

  openSnackBar(id) {
    this.snackBar.open(`Todo ${id} updated successfully...`, 'Ok', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
