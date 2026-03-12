
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;
@Component({
selector: 'app-contacto',
imports: [FormsModule],
templateUrl: './contacto-component.html',
styleUrl: './contacto-component.css',
})
export class ContactoComponent {
tituloModal = '';
mensajeModal = '';
procesarFormulario(form: NgForm) {
if (form.invalid) {
this.tituloModal = 'Error';
this.mensajeModal = 'Completa correctamente todos los campos.';
} else {
this.tituloModal = 'Éxito';
this.mensajeModal = 'Formulario enviado correctamente.';
form.resetForm();
}
const modal =
document.getElementById('modalResultado');
if (modal) {
new bootstrap.Modal(modal).show();
}
}
}