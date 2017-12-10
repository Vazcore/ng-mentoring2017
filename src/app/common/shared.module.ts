import { NgModule, ModuleWithProviders } from '@angular/core';
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
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ModalService
      ]
    };
  }
}
