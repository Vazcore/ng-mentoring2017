import { CourseInterface } from './course.interface';
import { Author } from '../../authors/author.model';

export class Course implements CourseInterface {
  
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public date:Date,
    public duration: number,
    public authors: Array<Author>,
    public topRated?: boolean) {

  }
}

export const FRESH_COLOR = 'green';
export const UPCOMING_COLOR = 'blue';
export const OUTDATED_COLOR = 'gray';
