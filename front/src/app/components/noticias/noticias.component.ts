import { NgIf, NgFor, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartaNoticiaComponent } from '../carta-noticia/carta-noticia.component';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    CartaNoticiaComponent,
    RouterLink
  ],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {
  title = "Noticias";
  public busqueda: string = "";
  public noticias: any = [];
  public paginaActual: number = 1;
  public paginas: number = 0;

  constructor(private noticiaService: NoticiaService, public loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerNoticias();
    this.obtenerPaginas();
  }

  public obtenerNoticias(): void {
    if (this.busqueda === "") {
      this.noticiaService.obtenerAlgunos(this.paginaActual).subscribe({
        next: (noticias) => {
          this.noticias = noticias;
        },
        error: (error) => {
          console.error("Error obteniendo noticias:", error);
          this.noticias = [];
        }
      });
    } else {
      this.noticiaService.obtenerAlgunosPorBusqueda(this.busqueda, this.paginaActual).subscribe({
        next: (noticias) => {
          this.noticias = noticias;
        },
        error: (error) => {
          console.error("Error obteniendo noticias:", error);
          this.noticias = [];
        }
      });
    }
  }

  public buscarNoticias(): void {
    this.busqueda = (document.getElementById("buscarNoticia") as HTMLInputElement).value;
    this.obtenerNoticias();
    this.obtenerPaginas();
  }

  public limpiarBusqueda(): void {
    this.busqueda = "";
    (document.getElementById("buscarNoticia") as HTMLInputElement).value = "";
    this.obtenerNoticias();
    this.obtenerPaginas();
  }

  public paginaAnterior(): void {
    this.paginaActual--;
    this.obtenerNoticias();
  }

  public paginaSiguiente(): void {
    this.paginaActual++;
    this.obtenerNoticias();
  }

  public primeraPagina(): void {
    this.paginaActual = 1;
    this.obtenerNoticias();
  }

  public ultimaPagina(): void {
    this.paginaActual = this.paginas;
    this.obtenerNoticias();
  }

  public obtenerPaginas() {
    let i: number = 1;
    let noticias: any;
    const obtenerCantidad = (): void => {
      if (this.busqueda === "") {
        this.noticiaService.obtenerAlgunos(i).subscribe({
          next: (noticiasObtenidas: any) => {
            noticias = noticiasObtenidas;

            if (noticias.length > 0) {
              i++;
              obtenerCantidad();
            } else {
              this.paginas = i - 1;
            }
          },
          error: (error) => {
            console.error("Error obteniendo noticias:", error);
            noticias = [];
          }
        });
      } else {
        this.noticiaService.obtenerAlgunosPorBusqueda(this.busqueda, i).subscribe({
          next: (noticiasObtenidas: any) => {
            noticias = noticiasObtenidas;

            if (noticias.length > 0) {
              i++;
              obtenerCantidad();
            } else {
              this.paginas = i - 1;
            }
          },
          error: (error) => {
            console.error("Error obteniendo noticias:", error);
            noticias = [];
          }
        });
      }
    }

    obtenerCantidad();
  }
}
