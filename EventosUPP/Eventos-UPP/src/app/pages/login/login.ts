import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {

  constructor(private router: Router) {}

  login() {

    alert('Bienvenido profesor');
    this.router.navigate(['/profesor']);
  }

}