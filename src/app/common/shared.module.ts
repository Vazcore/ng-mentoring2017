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
import { DateInputComponent } from './date-input/date-input.component';
import { DurationInputComponent } from './duration-input/duration-input.component';
import { RequestsService } from './requests/requests.service';
import { AuthorizedHttpService } from './requests/authorized-http.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchBarComponent,
    ModalComponent,
    BorderColorDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
    DateInputComponent,
    DurationInputComponent
  ],
  exports: [
    SearchBarComponent,
    ModalComponent,
    BorderColorDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
    DateInputComponent,
    DurationInputComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: AuthorizedHttpService,
          useFactory: (backend: XHRBackend, options: RequestOptions) => {
            return new AuthorizedHttpService(backend, options);
          },
          deps: [XHRBackend, RequestOptions]
        },
        ModalService,
        DatesService,
        RequestsService
      ]
    };
  }
}
