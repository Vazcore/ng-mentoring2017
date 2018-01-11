import { Course } from './course.model';

export interface ModifyAction {
  type: string,
  course: Course
}