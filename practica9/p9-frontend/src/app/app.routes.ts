import { Routes } from '@angular/router';
import { Tabla } from './pages/tabla/tabla';
import { Formulario } from './pages/formulario/formulario';

export const routes: Routes = [
  { path: 'alumnos', component: Tabla },
  { path: 'nuevo', component: Formulario },
  { path: '', redirectTo: 'alumnos', pathMatch: 'full' }

];