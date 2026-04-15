import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const profesorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Acceso Permitido
  }

  // Redirigir al inicio de sesión de profesor porque no hay sesión
  router.navigate(['/login']);
  return false;
};