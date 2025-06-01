import { Location, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LimitLineBreak } from '../../directives/limit-line-break.directive';
import { LoginService } from '../../services/login/login.service';
import { TorneoService } from '../../services/torneo/torneo.service';

@Component({
  selector: 'app-crear-torneo',
  standalone: true,
  imports: [NgIf, NgFor, LimitLineBreak, ReactiveFormsModule],
  templateUrl: './crear-torneo.component.html',
  styleUrl: './crear-torneo.component.css'
})
export class CrearTorneoComponent {
  public maxLineas: number = 10;
  public intervalos: number[] = [];
  public rondas: number[] = [];
  public minDate: string;
  public maxDate: string;
  public minTime: string = '08:00';
  public maxTime: string = '22:00';

  public formulario = new FormGroup({
    sistemaEmparejamiento: new FormControl('Suizo'),
    cantidadRondas: new FormControl(4),
    fecha: new FormControl('', [
      Validators.required,
      this.fechaValida.bind(this),
    ]),
  });

  constructor(private location: Location, private loginService: LoginService, private torneoService: TorneoService) {
    for (let i: number = 1; i < 15; i++) {
      this.intervalos.push(i);

      if (i > 3 && i < 11) {
        this.rondas.push(i);
      }
    }

    this.formulario.get('sistemaEmparejamiento')?.valueChanges.subscribe(valor => {
      const cantidadRondas = this.formulario.get('cantidadRondas');
      if (valor === 'Todos contra todos') {
        cantidadRondas?.disable(); // Bloquea el campo
      } else if (valor === 'Todos contra todos (ida y vuelta)') {
        cantidadRondas?.disable();
      } else {
        cantidadRondas?.enable();
        cantidadRondas?.setValue(4);
      }
    });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.maxDate = nextMonth.toISOString().split('T')[0];
  }

  fechaValida(control: AbstractControl) {
    const fechaSeleccionada = new Date(control.value);
    const minDate = new Date(this.minDate);
    const maxDate = new Date(this.maxDate);

    if (fechaSeleccionada < minDate || fechaSeleccionada > maxDate) {
      return { fechaInvalida: true };
    }
    return null;
  }

  get fecha() {
    return this.formulario.get('fecha');
  }

  public volver(): void {
    this.location.back();
  }

  public crearTorneo(): void {
    if (this.formulario.invalid) {
      alert('Por favor, rellená todos los campos obligatorios');
      return;
    }

    let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    let descripcion: string | null = (document.getElementById('descripcion') as HTMLInputElement).value;

    if (!nombre) {
      alert('Por favor, ingresá un nombre para el torneo');
      return;
    }

    if (!descripcion) {
      descripcion = null;
    }

    if (this.fecha?.hasError('fechaInvalida')) {
      alert('La fecha seleccionada no es válida');
      return;
    } 

    let horaRondas: string = (document.getElementById('hora-rondas') as HTMLInputElement).value;

    if (!horaRondas) {
      alert('Por favor, ingresá una hora para las rondas');
      return;
    }

    let minimoJugadores: number = Number((document.getElementById('minimo-jugadores') as HTMLInputElement).value);
    let maximoJugadores: number = Number((document.getElementById('maximo-jugadores') as HTMLInputElement).value);

    if (!minimoJugadores) {
      minimoJugadores = 0;
    }
    
    if (!maximoJugadores) {
      maximoJugadores = 0;
    }

    if (minimoJugadores && maximoJugadores) {
      if (minimoJugadores > maximoJugadores) {
        alert('El mínimo de jugadores no puede ser mayor que el máximo');
        return;
      }
    }

    let minimoElo: number = Number((document.getElementById('minimo-elo') as HTMLInputElement).value);
    let maximoElo: number = Number((document.getElementById('maximo-elo') as HTMLInputElement).value);

    if (!minimoElo) {
      minimoElo = 0;
    }
    
    if (!maximoElo) {
      maximoElo = 0;
    }

    if (minimoElo && maximoElo && minimoElo > maximoElo) {
      alert('El mínimo de elo no puede ser mayor que el máximo');
      return;
    }

    const torneo = {
      sistema_emparejamiento: this.formulario.get('sistemaEmparejamiento')?.value,
      cantidad_rondas: this.formulario.get('cantidadRondas')?.value,
      fecha_hora_inicio: (document.getElementById("fecha-inicio") as HTMLInputElement).value + " " + horaRondas + ":00",
      intervalo_rondas: Number((document.getElementById('intervalo-rondas') as HTMLInputElement).value),
      minimo_jugadores: minimoJugadores,
      maximo_jugadores: maximoJugadores,
      minimo_elo: minimoElo,
      maximo_elo: maximoElo,
      nombre: (document.getElementById('nombre') as HTMLInputElement).value,
      organizador_id: this.loginService.getUsuarioId(),
      descripcion: descripcion,
      ritmo: (document.getElementById('ritmo') as HTMLInputElement).value,
    }

    this.torneoService.agregar(torneo).subscribe({
      next: (res: any) => {
        alert('Torneo creado exitosamente');
        this.volver();
      },
      error: (err) => {
        console.log(err);
        alert('Error al crear el torneo. Inténtalo más tarde');
      }
    });

  }
}
