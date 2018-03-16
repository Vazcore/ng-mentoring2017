import { Action } from '@ngrx/store';
import { Course } from './course/course.model';

export const CREATE_MANY  = '[Courses] Create_Many';
export const CREATE  = '[Courses] Create';
export const CLEAR_AND_CREATE  = '[Courses] ClearAndCreate';
export const UPDATE  = '[Courses] Update';
export const DELETE  = '[Courses] Delete';

export class CreateMany implements Action {
  readonly type = CREATE_MANY;
  constructor(public courses: Course[]) {}
}

export class ClearAndCreate implements Action {
  readonly type = CLEAR_AND_CREATE;
  constructor(public courses: Course[]) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public course: Course) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(
    public id: number,
    public changes: Partial<Course>
  ) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: number) {}
}

export type CourseActions
= Create
| Update
| Delete
| CreateMany
| ClearAndCreate;