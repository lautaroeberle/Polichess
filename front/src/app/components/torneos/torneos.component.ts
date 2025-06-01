  import { Component, OnInit } from '@angular/core';
  import { TorneoService } from '../../services/torneo/torneo.service'; // Ajusta la ruta si es necesario
  import { Router, RouterModule } from '@angular/router';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { TorneoComponent } from '../torneo/torneo.component';
  import { LoginService } from '../../services/login/login.service';

  @Component({
    selector: 'app-torneos',
    standalone: true,
    imports: [CommonModule,FormsModule,RouterModule,TorneoComponent],
    templateUrl: './torneos.component.html',
    styleUrls: ['./torneos.component.css']
  })
  export class TorneosComponent implements OnInit {
  torneos: any[] = [];
  paginaActual: number = 1;
  paginas: number = 0;
  searchQuery: string = '';

  constructor(
    private torneoService: TorneoService,
    private router: Router,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.obtenerPaginas();
    this.cargarTorneos();
  }

  cargarTorneos(): void {
    if (this.searchQuery) {
      this.torneoService.obtenerAlgunosPorBusquda(this.paginaActual, this.searchQuery).subscribe({
        next: (data: any) => this.torneos = data,
        error: (err) => console.error('Error al buscar torneos', err)
      });
    } else {
      this.torneoService.obtenerAlgunos(this.paginaActual).subscribe({
        next: (data: any) => this.torneos = data,
        error: (err) => console.error('Error al obtener torneos', err)
      });
    }
  }

  buscarTorneos(): void {
    this.paginaActual = 1;
    this.obtenerPaginas();
    this.cargarTorneos();
  }

  limpiarBusqueda(): void {
    this.searchQuery = '';
    this.paginaActual = 1;
    this.obtenerPaginas();
    this.cargarTorneos();
  }

  obtenerPaginas(): void {
    let i = 1;
    const buscarCantidad = () => {
      const llamada = this.searchQuery
        ? this.torneoService.obtenerAlgunosPorBusquda(i, this.searchQuery)
        : this.torneoService.obtenerAlgunos(i);

      llamada.subscribe({
        next: (torneos: any) => {
          if (torneos.length > 0) {
            i++;
            buscarCantidad();
          } else {
            this.paginas = i - 1;
          }
        },
        error: (err) => {
          console.error("Error al contar torneos", err);
          this.paginas = 0;
        }
      });
    };
    buscarCantidad();
  }

  paginaAnterior(): void {
    this.paginaActual--;
    this.cargarTorneos();
  }

  paginaSiguiente(): void {
    this.paginaActual++;
    this.cargarTorneos();
  }

  primeraPagina(): void {
    this.paginaActual = 1;
    this.cargarTorneos();
  }

  ultimaPagina(): void {
    this.paginaActual = this.paginas;
    this.cargarTorneos();
  }

  verDetalles(id: number): void {
    this.router.navigate([`/torneos/${id}`]);
  }
}
