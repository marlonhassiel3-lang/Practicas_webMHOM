import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { EventosService, Evento } from '../../services/eventos.service';
import { HttpClient } from '@angular/common/http';
import { ScrollAnimateDirective } from '../../shared/scroll-animate.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ScrollAnimateDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(40px)'
        }),
        animate(
          '600ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ])
    ]),
    trigger('staggeredFadeIn', [
      transition(':enter', [
        query('.col-md-4', [
          style({ opacity: 0, transform: 'translateY(40px)' }),
          stagger('150ms', [
            animate('600ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Home implements OnInit {
  eventos: Evento[] = [];
  avisos: any[] = [];

  constructor(private eventosService: EventosService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.eventosService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
      },
      error: (err) => {
        console.error('No se pudieron obtener los eventos', err);
      }
    });

    this.http.get<any[]>('/api/avisos').subscribe({
      next: (data) => this.avisos = data,
      error: (err) => console.error('Error cargando avisos', err)
    });
  }

  verEvento(evento: any) {
    this.router.navigate(['/detalle', evento._id], { state: { evento } });
  }
}
