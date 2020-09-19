import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retriveAllTodos() {
    const username = sessionStorage.getItem('authenticatorUser');
    return this.http.get<Todo[]>(`${environment.TODO_JPA_API_URL}/users/${username}/todos`);
  }

  deleteTodo(id) {
    const username = sessionStorage.getItem('authenticatorUser');
    return this.http.delete<any>(`${environment.TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retriveTodo(id) {
    const username = sessionStorage.getItem('authenticatorUser');
    return this.http.get<Todo>(`${environment.TODO_JPA_API_URL  }/users/${username}/todos/${id}`);
  }

  updateTodo(id, todo) {
    const username = sessionStorage.getItem('authenticatorUser');
    return this.http.put<Todo>(`${environment.TODO_JPA_API_URL}/users/${username}/todos/${id}`, todo);
  }

  createTodo(todo) {
    const username = sessionStorage.getItem('authenticatorUser');
    return this.http.post<any>(`${environment.TODO_JPA_API_URL}/users/${username}/todos`, todo);
  }

}
