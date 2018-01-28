import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true
    }
  ]
})
export class DurationInputComponent implements ControlValueAccessor, OnInit {
  onChange = (_) => {};
  onTouched = (_) => {};
  private _duration: number;

  constructor() { }

  ngOnInit() {
  }

  changeDuration(event: any): void {
    this.duration = event.target.value;
  }

  set duration(value: number){
    if (value) {
      this._duration = value;
      this.onChange(value);
    }
  }

  get duration(): number {
    return this._duration;
  }

  writeValue(value: number): void {
    if (this.duration !== value) {
      this.duration = value;
    }
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
