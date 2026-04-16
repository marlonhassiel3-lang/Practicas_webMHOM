import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './detalle-evento.html',
  styleUrl: './detalle-evento.css',
})
export class DetalleEvento implements OnInit {
  evento: any = null;
  cargando = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Intenta leer el evento del estado del router (cuando viene de la lista)
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state?.['evento']) {
      this.evento = state['evento'];
      this.cargando = false;
      return;
    }

    // Fallback: obtener por ID desde la API
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'No se especificó ningún evento.';
      this.cargando = false;
      return;
    }
    this.http.get<any>(`/api/eventos/${id}`).subscribe({
      next: (data) => {
        this.evento = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando evento por ID:', err);
        // Último recurso: buscar en la lista completa
        this.http.get<any[]>('/api/eventos').subscribe({
          next: (eventos) => {
            const found = eventos.find(e => e._id === id || String(e._id) === id);
            if (found) {
              this.evento = found;
              this.cargando = false;
            } else {
              this.error = 'No se pudo cargar el evento.';
              this.cargando = false;
            }
          },
          error: () => {
            this.error = 'No se pudo cargar el evento.';
            this.cargando = false;
          }
        });
      }
    });
  }

  contactarOrganizador() {
    this.router.navigate(['/contactos'], { state: { evento: this.evento } });
  }
}
