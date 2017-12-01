import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit {
  @Output() onFind: EventEmitter<string> = new EventEmitter<string>();
  keyword: string = '';

  constructor() { }

  ngOnInit() {
  }

  find() {
    this.onFind.emit(this.keyword);
  }

}
