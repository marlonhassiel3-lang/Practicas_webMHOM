import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDataService } from '../../../services/admin-data.service';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats: any = { usuarios: 0, eventos: 0, avisos: 0, solicitudes: 0 };
  cargando = true;

  constructor(private adminData: AdminDataService, public auth: AdminAuthService) {}

  ngOnInit() {
    this.adminData.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando estadísticas del dashboard', err);
        this.cargando = false;
      }
    });
  }
}
