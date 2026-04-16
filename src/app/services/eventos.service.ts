import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evento {
  _id?: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  imagen: string;
  estado?: string;
  cupoMaximo?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  // Llama al EndPoint del backend SSR que configuramos
  private apiUrl = '/api/eventos'; 

  constructor(private http: HttpClient) {}

  // Pide todos los eventos en formato JSON
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  getMisEventos(profesorId: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`/api/profesor/${profesorId}/eventos`);
  }

  eliminarEvento(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  actualizarEstado(id: string, estado: string): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}/estado`, { estado });
  }
}
