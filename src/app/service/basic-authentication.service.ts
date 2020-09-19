import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(`${environment.API_URL}/authenticate`, {username, password}).pipe(
      map(
        resp => {
          sessionStorage.setItem('authenticatorUser', username);
          sessionStorage.setItem('token', `Bearer ${resp.token}`);
          return resp;
        }
      )
    );
  }

  executeAuthenticationService(username, password) {
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    const headers  = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });

    return this.http.get<AuthenticationBean>(`${environment.API_URL}/basicauth`, {headers}).pipe(
      map(
        resp => {
          sessionStorage.setItem('authenticatorUser', username);
          sessionStorage.setItem('token', basicAuthHeaderString);
          return resp;
        }
      )
    );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatorUser');
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('token');
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticatorUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticatorUser');
    sessionStorage.removeItem('token');
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
