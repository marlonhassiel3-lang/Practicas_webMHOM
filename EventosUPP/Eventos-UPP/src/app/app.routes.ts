import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Eventos } from './pages/eventos/eventos';
import { DetalleEvento } from './pages/detalle-evento/detalle-evento';
import { Contacto } from './pages/contacto/contacto';
import { Contactos } from './pages/contactos/contactos';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'eventos', component: Eventos },
  { path: 'detalle', component: DetalleEvento },
  { path: 'contacto', component: Contacto },
  {
  path: 'contactos', 
  loadComponent: () => import('./pages/contactos/contactos').then(m => m.Contactos)
  },
  {
  path: 'profesor',
  loadComponent: () => import('./pages/profesor/profesor').then(m => m.Profesor)
},
{
  path: 'profesor/crear-evento',
  loadComponent: () => import('./pages/crear-evento/crear-evento').then(m => m.CrearEvento)
},
{
  path: 'profesor/mis-eventos',
  loadComponent: () => import('./pages/mis-eventos/mis-eventos').then(m => m.MisEventos)
},
{
  path: 'login',
  loadComponent: () => import('./pages/login/login').then(m => m.Login)
}
];