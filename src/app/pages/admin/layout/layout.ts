import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  constructor(public auth: AdminAuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}