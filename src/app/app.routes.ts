import { Route, Router, Routes } from '@angular/router';
import {
  CoursesPageComponent,
  CourseFormPageComponent,
  NotFoundPageComponent,
  LoginPageComponent
} from './pages/index';
import { CanActivateAppService } from './app-guards/can-activate-app.service';
import { CanActivateLoginService } from './pages/login-page/can-activate-login.service';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'login', component:  LoginPageComponent, canActivate: [CanActivateLoginService]},
  { path: 'courses', component:  CoursesPageComponent, canActivate: [CanActivateAppService]},
  { path: 'courses/new', component:  CourseFormPageComponent, canActivate: [CanActivateAppService]},
  { path: 'courses/:id', component:  CourseFormPageComponent, canActivate: [CanActivateAppService]},
  { path: '404', component: NotFoundPageComponent, canActivate: [CanActivateAppService] },
  { path: '**', redirectTo: '404' }
];