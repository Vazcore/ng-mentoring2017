import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.less']
})
export class DateInputComponent implements OnInit {
  @Input() date: Date;

  constructor() { }

  ngOnInit() {
  }

}
