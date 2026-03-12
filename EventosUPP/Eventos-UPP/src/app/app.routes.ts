import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Eventos } from './pages/eventos/eventos';
import { DetalleEvento } from './pages/detalle-evento/detalle-evento';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'eventos', component: Eventos },
  { path: 'detalle', component: DetalleEvento },
  { path: 'contacto', component: Contacto }
];