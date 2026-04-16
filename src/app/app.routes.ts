import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { profesorGuard } from './guards/profesor.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'eventos', loadComponent: () => import('./pages/eventos/eventos').then(m => m.Eventos) },
  { path: 'detalle/:id', loadComponent: () => import('./pages/detalle-evento/detalle-evento').then(m => m.DetalleEvento) },
  { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto) },
  {
  path: 'contactos', 
  loadComponent: () => import('./pages/contactos/contactos').then(m => m.Contactos)
  },
  {
  path: 'profesor',
  loadComponent: () => import('./pages/profesor/profesor').then(m => m.Profesor),
  canActivate: [profesorGuard]
},
{
  path: 'profesor/crear-evento',
  loadComponent: () => import('./pages/crear-evento/crear-evento').then(m => m.CrearEvento),
  canActivate: [profesorGuard]
},
{
  path: 'profesor/mis-eventos',
  loadComponent: () => import('./pages/mis-eventos/mis-eventos').then(m => m.MisEventos),
  canActivate: [profesorGuard]
},
{
  path: 'profesor/mis-mensajes',
  loadComponent: () => import('./pages/mis-mensajes/mis-mensajes').then(m => m.MisMensajes),
  canActivate: [profesorGuard]
},
{
  path: 'login',
  loadComponent: () => import('./pages/login/login').then(m => m.Login)
},
{
  path: 'admin/login',
  loadComponent: () => import('./pages/admin/login/login').then(m => m.Login)
},
{
  path: 'admin',
  loadComponent: () => import('./pages/admin/layout/layout').then(m => m.Layout),
  canActivate: [adminGuard],
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
      path: 'profesores',
      loadComponent: () => import('./pages/admin/profesores/profesores').then(m => m.Profesores)
    },
    {
      path: 'publicaciones',
      loadComponent: () => import('./pages/admin/publicaciones/publicaciones').then(m => m.Publicaciones)
    },
    {
      path: 'avisos',
      loadComponent: () => import('./pages/admin/avisos/avisos').then(m => m.Avisos)
    },
    {
      path: 'solicitudes',
      loadComponent: () => import('./pages/admin/solicitudes/solicitudes').then(m => m.Solicitudes)
    },
    {
      path: 'configuracion',
      loadComponent: () => import('./pages/admin/configuracion/configuracion').then(m => m.Configuracion)
    }
  ]
}
];