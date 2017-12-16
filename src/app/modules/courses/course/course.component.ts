import { Component, OnInit } from '@angular/core';
import { Course, FRESH_COLOR, UPCOMING_COLOR } from './course.model';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ModalService } from '../../../common/modal/modal.service';
import { DatesService } from '../../../common/dates/dates.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleteCourse = new EventEmitter<Course>();

  borderColor: string;
  constructor(
    private modalService: ModalService,
    private datesService: DatesService
  ) { }

  ngOnInit() {
    this.defineCourseStatus();
  }

  defineCourseStatus(): void {
    let currentDate = this.datesService.getCurrentDate().getTime();
    let courseDate = this.course.date.getTime(); 
    let twoWeeksShift = 14 * 24 * 60 * 60 * 1000;
    
    if (courseDate > currentDate) {
      this.borderColor = UPCOMING_COLOR;
    }
    else if (
      courseDate < currentDate 
      && courseDate >= (currentDate - twoWeeksShift)
    ) {
      this.borderColor = FRESH_COLOR;
    }
  }

  onAskToDelete(course: Course): void {
    this.modalService.open(course.id.toString());
  }

  onDelete(course: Course): void {
    this.modalService.close(course.id.toString());
    this.deleteCourse.emit(course);
  }

  onCancelDelete(modalId: string): void {
    this.modalService.close(modalId.toString());
  }

}
