import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { 
  ModalComponent,
  ModalService } from './modal/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchBarComponent,
    ModalComponent
  ],
  exports: [
    SearchBarComponent,
    ModalComponent
  ],
  providers: [
    ModalService
  ]
})
export class SharedModule { }
