import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appBorderColor]',
  inputs: ['borderColor']
})
export class BorderColorDirective implements OnInit {
  borderColor: string;
  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngOnInit() {
    this.renderer.setElementStyle(
      this.el.nativeElement,
      'border',
      `1px solid ${this.borderColor}`
    );
  }

}
