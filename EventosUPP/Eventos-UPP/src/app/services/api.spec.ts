import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:3000/api/eventos';

  constructor(private http: HttpClient) {}

  getEventos(){
    return this.http.get(this.url);
  }
}