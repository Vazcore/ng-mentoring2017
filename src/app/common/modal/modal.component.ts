import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { ModalService } from './modal.service';
import { element } from 'protractor';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @Input() id: string;
  private element: ElementRef;
  private elNode: Node;
  private bodyElement: Element;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
    this.elNode = this.el.nativeElement.cloneNode(true);
  }

  ngOnInit(): void {
    let modal = this;

    // ensure id attribute exists
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    
    //this.element.appendTo('body');

    

    // add self (this modal instance) to the modal service so it's accessible from controllers
    
  }

  ngAfterViewInit() {
    this.bodyElement = document.querySelector('body');
    //this.bodyElement.appendChild(this.elNode);
    this.modalService.add(this);

    // close modal on background click
    // this.element.on('click', function (e: any) {
    //   var target = $(e.target);
    //   if (!target.closest('.modal-body').length) {
    //       modal.close();
    //   }
    // });
  }
  
  onClick(event) {
    if (event.target.closest('.modal-body') === null ) {
      this.close();
    }
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.el.nativeElement.remove();
  }

  // open modal
  open(): void {
    // this.element.show();
    this.bodyElement.classList.add('modal-open');
    this.el.nativeElement.classList.add('active');
    //document.querySelector('[ng-reflect-id="'+this.id+'"]').classList.add('active');
  }

  // close modal
  close(): void {
    // this.element.hide();
    // $('body').removeClass('modal-open');
    this.el.nativeElement.classList.remove('active');
    this.bodyElement.classList.remove('modal-open');
  }

}
