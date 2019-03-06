import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: any = {};
  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit() {
    this.user = this._loginService.getEmployeeLocalStorage();
  }

  logOut() {
    if ( this._loginService.logOut() ) {
      this._router.navigate(['/login']);
    }
  }
}
