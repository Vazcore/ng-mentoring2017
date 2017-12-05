import { Component, OnInit } from '@angular/core';
import { Course } from './course.model';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ModalService } from '../../../common/modal/modal.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleteCourse = new EventEmitter<Course>();

  constructor(private modalService: ModalService) { }

  ngOnInit() {  }

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
