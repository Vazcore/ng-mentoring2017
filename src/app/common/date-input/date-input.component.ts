import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor, OnInit {
  onChange = (_) => {};
  onTouched = (_) => {};
  private _currentDate: Date;

  constructor() { }

  ngOnInit() {
  }

  setDate(date: any): void {
    this.date = date.target.value;
  }

  get date(): Date {
    return this._currentDate;
  }

  set date(newValue: Date) {
    if (newValue !== this.date) {
      this._currentDate = newValue;
      this.onChange(newValue);
    }
  }


  writeValue(value: any): void {
    if (this.date !== value) {
      this.date = value;
    }
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
