import { Component, OnInit, Input } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() logo: string;

  constructor() { }

  ngOnInit() {
    
  }

}
