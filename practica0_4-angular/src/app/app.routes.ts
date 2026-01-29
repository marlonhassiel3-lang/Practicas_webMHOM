

import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Listado } from './pages/listado/listado';
export const routes: Routes = [
{ path: 'home', component: Home },
{ path: 'contacto', component: Contact },
{ path: 'listado', component: Listado }
];
