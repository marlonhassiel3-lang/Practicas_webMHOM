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

}
