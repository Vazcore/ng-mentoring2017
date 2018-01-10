import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { 
  ModalComponent,
  ModalService } from './modal/index';
import { BorderColorDirective } from './border-color/border-color.directive';
import { DatesService } from './dates/dates.service';
import { DurationPipe } from './dates/duration.pipe';
import { OrderByPipe } from './order/order-by.pipe';
import { FilterByPipe } from './filter/filter-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchBarComponent,
    ModalComponent,
    BorderColorDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe
  ],
  exports: [
    SearchBarComponent,
    ModalComponent,
    BorderColorDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe
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
