import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Acceso Permitido
  }

  // Redirigir porque no ha iniciado sesión
  router.navigate(['/admin/login']);
  return false;
};
