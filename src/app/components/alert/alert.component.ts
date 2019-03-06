import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  CLASS_SUCCESS = 'alert-success';
  CLASS_INFO = 'alert-info';
  CLASS_WARNING = 'alert-warning';
  CLASS_DANGER = 'alert-danger';
  CLASS_PRIMARY = 'alert-primary';
  @Input() alertShow: boolean;
  @Input() alertClass: string;
  @Input() alertMessage: string;
  constructor() { }

  ngOnInit() {
  }

}
