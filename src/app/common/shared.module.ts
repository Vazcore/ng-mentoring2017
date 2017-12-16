import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { 
  ModalComponent,
  ModalService } from './modal/index';
import { BorderColorDirective } from './border-color/border-color.directive';
import { DatesService } from './dates/dates.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchBarComponent,
    ModalComponent,
    BorderColorDirective
  ],
  exports: [
    SearchBarComponent,
    ModalComponent,
    BorderColorDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ModalService,
        DatesService
      ]
    };
  }
}
