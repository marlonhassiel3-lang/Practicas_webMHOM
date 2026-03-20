import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Api } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
export class Home implements OnInit {
  eventos: any[] = [];

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getEventos().subscribe((data: any[]) => {
      this.eventos = data;
    });
  }
}
