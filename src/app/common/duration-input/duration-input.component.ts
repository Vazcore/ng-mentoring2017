import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.less']
})
export class DurationInputComponent implements OnInit {
  @Input() duration: number;

  constructor() { }

  ngOnInit() {
  }

}
