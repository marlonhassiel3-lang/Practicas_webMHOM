import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get('/api/admin/stats');
  }

  getAvisos(): Observable<any[]> {
    return this.http.get<any[]>('/api/avisos');
  }

  crearAviso(aviso: any): Observable<any> {
    return this.http.post('/api/avisos', aviso);
  }

  eliminarAviso(id: string): Observable<any> {
    return this.http.delete(`/api/avisos/${id}`);
  }

  getProfesores(): Observable<any[]> {
    return this.http.get<any[]>('/api/profesores');
  }

  crearProfesor(profesor: any): Observable<any> {
    return this.http.post('/api/profesores', profesor);
  }

  eliminarProfesor(id: string): Observable<any> {
    return this.http.delete(`/api/profesores/${id}`);
  }

  getSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>('/api/solicitudes');
  }

  eliminarSolicitud(id: string): Observable<any> {
    return this.http.delete(`/api/solicitudes/${id}`);
  }
}
