import { CourseInterface } from './course.interface';

export class Course implements CourseInterface {
  id: number;
  title: string;
  description: string;
  date: Date;
  duration: number;
}
