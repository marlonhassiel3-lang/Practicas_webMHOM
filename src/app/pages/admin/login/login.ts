import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credenciales = { email: '', password: '' };
  errorLogin: string | null = null;
  cargando = false;

  constructor(private authService: AdminAuthService, private router: Router) {}

  onSubmit() {
    this.errorLogin = null;
    this.cargando = true;

    this.authService.login(this.credenciales).subscribe({
      next: (res) => {
        this.cargando = false;
        // Redirigir al panel de administración tras éxito
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.cargando = false;
        this.errorLogin = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }
}