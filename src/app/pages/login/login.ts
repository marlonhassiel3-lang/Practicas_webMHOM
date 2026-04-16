import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html'
})
export class Login {
  email = '';
  password = '';
  errorLogin: string | null = null;
  cargando = false;

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.errorLogin = null;
    this.cargando = true;

    this.http.post<any>('/api/admin/login', { email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.cargando = false;
        if (typeof window !== 'undefined') {
          localStorage.setItem('adminToken', res.token);
          localStorage.setItem('adminUser', JSON.stringify(res.user));
        }
        // Redirigir por rol
        if (res.user.rol === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/profesor']);
        }
      },
      error: (err) => {
        this.cargando = false;
        this.errorLogin = err.error?.error || 'Correo o contraseña incorrectos';
      }
    });
  }
}