import { Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleFormComponent } from './people-form/people-form.component';

export const routes: Routes = [
  { path: '', component: PeopleListComponent },
  { path: 'create', component: PeopleFormComponent },
  { path: 'edit/:id', component: PeopleFormComponent }
];
