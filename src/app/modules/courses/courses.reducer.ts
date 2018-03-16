import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Course } from './course/course.model';
import { CourseActions, CREATE, UPDATE, DELETE, CREATE_MANY, CLEAR_AND_CREATE } from './courses.actions';


export const courseAdapter = createEntityAdapter<Course>();

export interface State extends EntityState<Course> {

}

const defaultCourse = [];

export const initialState: State = courseAdapter.getInitialState(defaultCourse);

export function courseReducer(
  state: State = initialState,
  action: CourseActions
) {

  switch(action.type) {
    case CREATE_MANY:
      return courseAdapter.addMany(action.courses, state);
    case CREATE:
      return courseAdapter.addOne(action.course, state);
    case CLEAR_AND_CREATE:
      return courseAdapter.addMany(action.courses, courseAdapter.removeAll(state));
    case UPDATE:
      return courseAdapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        }, state
      );
    case DELETE:
      return courseAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}

export const getCoursesState = createFeatureSelector<State>('courses');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = courseAdapter.getSelectors(getCoursesState);
