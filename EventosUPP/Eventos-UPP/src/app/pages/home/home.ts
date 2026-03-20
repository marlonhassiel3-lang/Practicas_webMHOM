import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
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
    ])
  ]
})
export class Home {
  eventos = [
    {
      titulo: 'Hackathon Universitario',
      descripcion: 'Competencia de programación donde equipos desarrollan soluciones tecnológicas en 24 horas.',
      fecha: '12 ABRIL',
      ubicacion: 'Laboratorio 5',
      imagen: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'
    },
    {
      titulo: 'Feria de Emprendimiento',
      descripcion: 'Estudiantes presentan ideas de negocio innovadoras frente a un jurado de expertos.',
      fecha: '18 ABRIL',
      ubicacion: 'Plaza Central',
      imagen: 'https://images.unsplash.com/photo-1531482615713-2afd69097998'
    },
    {
      titulo: 'Taller de Ciberseguridad',
      descripcion: 'Aprende sobre hacking ético y protección de sistemas informáticos en este taller práctico.',
      fecha: '25 ABRIL',
      ubicacion: 'Sala 4',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'
    },
    {
      titulo: 'Conferencia de Inteligencia Artificial',
      descripcion: 'Expertos de la industria comparten las últimas tendencias y avances en el mundo de la IA.',
      fecha: '30 ABRIL',
      ubicacion: 'Auditorio',
      imagen: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
    },
    {
      titulo: 'Taller de Angular',
      descripcion: 'Aprende a construir aplicaciones web modernas con el framework de Google.',
      fecha: '05 MAYO',
      ubicacion: 'Sala de Cómputo 2',
      imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
    },
    {
      titulo: 'Foro de Innovación',
      descripcion: 'Espacio de diálogo y colaboración entre estudiantes y empresas de base tecnológica.',
      fecha: '12 MAYO',
      ubicacion: 'Cetro de Vinculación',
      imagen: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
    }
  ];
}
