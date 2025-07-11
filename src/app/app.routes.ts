import { Routes } from '@angular/router';
import { EstudianteComponent } from './components/estudiante/estudiante.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: EstudianteComponent,
    title: 'Gestión de Estudiantes'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
