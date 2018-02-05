import { Author } from '../../authors/author.model';

export interface CourseInterface {
  id: number;
  title: string;
  duration: number;
  date: Date;
  description: string;
  topRated?: boolean;
  authors: Array<Author>
}
