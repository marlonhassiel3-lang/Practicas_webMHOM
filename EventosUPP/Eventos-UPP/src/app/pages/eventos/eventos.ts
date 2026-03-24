import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export const CATEGORIAS = ['Todos', 'Conferencias', 'Talleres', 'Cultura', 'Deportes'];

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class Eventos implements OnInit {
  categorias = CATEGORIAS;
  categoriaActiva = 'Todos';
  todos: any[] = [];
  filtrados: any[] = [];
  cargando = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('/api/eventos').subscribe({
      next: (data) => {
        this.todos = data;
        this.filtrar('Todos');
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  filtrar(categoria: string) {
    this.categoriaActiva = categoria;
    if (categoria === 'Todos') {
      this.filtrados = this.todos;
    } else {
      this.filtrados = this.todos.filter(e => e.categoria === categoria);
    }
  }

  verEvento(evento: any) {
    this.router.navigate(['/detalle', evento._id], { state: { evento } });
  }
}
