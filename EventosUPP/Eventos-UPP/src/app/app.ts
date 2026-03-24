import { Component, OnInit } from '@angular/core';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class App implements OnInit {

  eventos: any[] = [];

  constructor(private api: Api) {}

  ngOnInit(){
    this.api.getEventos().subscribe((data:any[]) => {
      this.eventos = data;
    });
  }
}