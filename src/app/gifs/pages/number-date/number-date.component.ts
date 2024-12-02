import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GifsService } from '../../sevices/gifs.service';

@Component({
  selector: 'number-date',
  templateUrl: 'number-date.html',
  styleUrls: ['number-date.component.css'],
})
export class NumberDateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private gifsService: GifsService) {
    this.form = this.fb.group({
      numero: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      fecha: ['', [Validators.required]],
    });
  }

  onKeyDown(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  submit() {
    if (this.form.valid) {
      const numero = parseFloat(this.form.get('numero')?.value);
      const numeroProcesado = !isNaN(numero)
        ? Math.floor(numero).toString()
        : '';

      const fecha = new Date(this.form.get('fecha')?.value);
      const fechaISO = fecha.toISOString();

      if (numeroProcesado) {
        this.gifsService.agregarHistorial(numeroProcesado);
      }
      this.gifsService.agregarHistorial(fechaISO);

      console.table([
        { Propiedad: 'Número', Valor: numero },
        { Propiedad: 'Fecha', Valor: this.form.get('fecha')?.value },
      ]);

      this.form.reset();
    }
  }
}
