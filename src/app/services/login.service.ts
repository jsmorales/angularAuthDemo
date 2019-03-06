import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_BASE = 'https://sai-auth.azurewebsites.net/api';
  constructor(private http: HttpClient) { }

  attemptLogin(userData: User) {
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.URL_BASE + '/authentication', body, {headers});
  }

  loggedIn() {
    return !!localStorage.getItem('token') && !!localStorage.getItem('employee.name');
  }

  getEmployeeLocalStorage(): any {
    const userLocal: any = {};
    userLocal.name = localStorage.getItem('employee.name');
    userLocal.position = localStorage.getItem('employee.position');
    userLocal.region = localStorage.getItem('employee.region');
    userLocal.token = localStorage.getItem('token');

    return userLocal;
  }

  logOut(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('employee.name');
    localStorage.removeItem('employee.position');
    localStorage.removeItem('employee.region');

    if ( !!localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
