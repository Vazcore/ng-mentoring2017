import { Component, OnInit } from '@angular/core';
import { Course } from './course.model';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleteCourse = new EventEmitter<Course>();

  constructor() { }

  ngOnInit() {  }

  onDelete(course: Course) {
    this.deleteCourse.emit(course);
  }

}
