import { CourseInterface } from './course.interface';

export class Course implements CourseInterface {
  
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public date:Date,
    public duration: number) {

  }
}
