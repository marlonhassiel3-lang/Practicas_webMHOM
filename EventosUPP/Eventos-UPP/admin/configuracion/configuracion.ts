import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion implements OnInit {
  nombrePortal = 'Eventos UPP';
  correo = 'eventos@upp.edu.mx';
  
  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.nombrePortal = localStorage.getItem('cfg_nombrePortal') || this.nombrePortal;
      this.correo = localStorage.getItem('cfg_correo') || this.correo;
    }
  }

  guardar() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cfg_nombrePortal', this.nombrePortal);
      localStorage.setItem('cfg_correo', this.correo);
      alert('Configuración básica guardada exitosamente');
    }
  }

  setTema(modo: string) {
    alert(`El diseño ${modo} será aplicado. Configuración local lista.`);
  }
}
