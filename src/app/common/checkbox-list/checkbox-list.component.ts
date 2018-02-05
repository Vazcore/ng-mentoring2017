import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListComponent),
      multi: true
    }
  ]
})
export class CheckboxListComponent implements ControlValueAccessor, OnInit {
  @Input() elements: Array<object>;
  @Input() primaryLabel: string;
  @Input() secondaryLabel: string;
  @Input() value: string;
  private _checkedElements;

  onChange = (_) => {};
  onTouched = (_) => {};

  constructor() { }

  ngOnInit() {
    
  }

  isChecked(element: any): boolean {
    return this.checkedElements.filter(el => el[this.value] === element[this.value]).length > 0;
  }

  changeSelectedElement(event: any, isChecked: boolean): void {
    let elementValue = event.target.value;
    if (isChecked === false) {
      let el = this.findElement(elementValue);
      this.checkedElements = [...this.checkedElements, el];
    } else {
      this.checkedElements = this.checkedElements.filter(element => element[this.value].toString() !== elementValue.toString());
    }
  }

  findElement(value: string):any {
    return _.find(this.elements, (element) => {
      return element[this.value].toString() === value.toString();
    });
  }

  set checkedElements(elements: any) {
    if (elements) {
      this._checkedElements = elements;
      this.onChange(elements);
    }
  }

  get checkedElements(): any {
    return this._checkedElements;
  }

  writeValue(value: any): void {
    if (value) {
      this.checkedElements = value;
    }
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
