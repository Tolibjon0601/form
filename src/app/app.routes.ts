import { Routes } from '@angular/router';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: DocumentListComponent },
  { path: 'add', component: DocumentFormComponent },
  { path: '**', redirectTo: '/list' }
];
