import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../../services/torneo/torneo.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
   standalone: true,
    imports: [CommonModule,RouterLink],
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  torneos: any[] = [];
  torneosPorDia: { [key: string]: any[] } = {};

  fechaActual: Date = new Date();
  diasMes: number[] = [];
  primerDiaSemana: number = 0;

  constructor(private torneoService: TorneoService) {}

  ngOnInit() {
    this.cargarTodosLosTorneos();
  }

  cargarTodosLosTorneos() {
    let pagina = 1;

    const torneosAcumulados: any[] = [];

    const cargarPagina = () => {
      this.torneoService.obtenerAlgunos(pagina).subscribe((data: any) => {
        if (data.length === 0) {
          this.torneos = torneosAcumulados;
          this.organizarTorneosPorDia();
          this.generarCalendario();
          return;
        }

        torneosAcumulados.push(...data);
        pagina++;
        cargarPagina(); // Recursivo hasta que no haya más
      });
    };

    cargarPagina();
  }

  organizarTorneosPorDia() {
    this.torneosPorDia = {};

    for (const torneo of this.torneos) {
      const fecha = new Date(torneo.fecha_hora_inicio);
      const key = fecha.toISOString().split('T')[0];

      if (!this.torneosPorDia[key]) {
        this.torneosPorDia[key] = [];
      }

      this.torneosPorDia[key].push(torneo);
    }
  }

  generarCalendario() {
    const año = this.fechaActual.getFullYear();
    const mes = this.fechaActual.getMonth();
    const inicio = new Date(año, mes, 1);
    const fin = new Date(año, mes + 1, 0);

    this.primerDiaSemana = inicio.getDay();
    this.diasMes = Array.from({ length: fin.getDate() }, (_, i) => i + 1);
  }

  cambiarMes(offset: number) {
    this.fechaActual.setMonth(this.fechaActual.getMonth() + offset);
    this.generarCalendario();
  }

  obtenerTorneosDelDia(dia: number) {
    const año = this.fechaActual.getFullYear();
    const mes = this.fechaActual.getMonth() + 1;
    const diaFormateado = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    return this.torneosPorDia[diaFormateado] || [];
  }
}
