import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profesor.html',
  styleUrl: './profesor.css',
})
export class Profesor implements OnInit {
  totalEventos: number = 0;
  cargandoEventos: boolean = true;

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    let profesorId = null;
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('adminUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        profesorId = user._id;
      }
    }

    if (!profesorId) {
      this.cargandoEventos = false;
      return;
    }

    this.eventosService.getMisEventos(profesorId).subscribe({
      next: (data) => {
        this.totalEventos = data.length;
        this.cargandoEventos = false;
      },
      error: () => this.cargandoEventos = false
    });
  }
}

