import { Routes } from '@angular/router';
import { Tabla } from './pages/tabla/tabla';
import { Formulario } from './pages/formulario/formulario';
import { Editar } from './pages/editar/editar';

export const routes: Routes = [
  { path: 'games', component: Tabla },
  { path: 'nuevo', component: Formulario },
  { path: 'editar/:id', component: Editar },
  { path: '', redirectTo: 'games', pathMatch: 'full' }
];