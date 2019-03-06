import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import {User} from '../../interfaces/User';

import { LoginService } from '../../services/login.service';
import {AlertComponent} from '../alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: User = {
    username: '',
    password: '',
    region: 'America/Bogota'
  };
  loadLogin = false;
  alertBoot = new AlertComponent();
  alertShow = false;
  alertMessage = '';
  alertClass = '';
  token = '';
  employee: any;
  constructor(private _loginService: LoginService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.verifySession();
  }

  verifySession() {
    if (this._loginService.loggedIn()) {
      this.router.navigate(['/main']);
    }
  }

  attemptLogin() {
    this.loadLogin = true;
    this.userData.password = Md5.hashStr(this.userData.password).toString();
    console.log(this.userData);

    this._loginService.attemptLogin(this.userData).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.loadLogin = false;
        this.showAlert(this.alertBoot.CLASS_SUCCESS, response.message);
        this.token = response.result.token;
        this.employee = response.result.employee;

        this.saveLocal('token', this.token);
        this.saveLocal('employee.name', this.employee.firstName + ' ' + this.employee.lastName);
        this.saveLocal('employee.position', this.employee.position);
        this.saveLocal('employee.region', this.employee.region);

        this.router.navigate(['/main']);
      }
    },
      error => {
        console.log(error.error);
        if (!error.success) {
          console.log(error.error.message);
          // -------------------------------------------
          this.showAlert(this.alertBoot.CLASS_DANGER, error.error.message);
        }
      });
  }

  showAlert(alertClass: string, message: string, time?: number) {
    this.alertShow = true;
    this.alertClass = alertClass;
    this.alertMessage = message;
    if (time) {
      setTimeout(() => {
        this.alertShow = false;
        this.loadLogin = false;
      }, time);
    } else {
      this.loadLogin = false;
    }
  }

  saveLocal(name: string, value: any) {
    localStorage.setItem(name, value);
  }
}
