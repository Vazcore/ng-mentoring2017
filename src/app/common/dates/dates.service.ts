import { Injectable } from '@angular/core';

@Injectable()
export class DatesService {

  private currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  getCurrentDate(): Date {
    return this.currentDate;
  }

}
