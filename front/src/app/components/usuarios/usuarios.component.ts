import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UsuarioComponent } from '../usuario/usuario.component';
 import { Router, RouterModule,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 👈 Import necesario

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, UsuarioComponent, RouterModule, RouterLink, FormsModule], // 👈 Asegurate de importar FormsModule
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  paginaActual: number = 1;
  paginas: number = 0;
  busqueda: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerPaginas();
    this.buscarUsuarios();
  }

  buscarUsuarios(): void {
    this.usuarioService.obtenerAlgunosPorBusqueda(this.busqueda, this.paginaActual).subscribe({
      next: (data: any) => this.usuarios = data,
      error: (err) => console.error('Error al obtener usuarios', err)
    });
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
    this.paginaActual = 1;
    this.obtenerPaginas();
    this.buscarUsuarios();
  }

  obtenerPaginas(): void {
    let i: number = 1;
    const obtenerCantidad = () => {
      this.usuarioService.obtenerAlgunosPorBusqueda(this.busqueda, i).subscribe({
        next: (usuariosObtenidos: any) => {
          if (usuariosObtenidos.length > 0) {
            i++;
            obtenerCantidad();
          } else {
            this.paginas = i - 1;
          }
        },
        error: (error) => {
          console.error('Error obteniendo cantidad de páginas de usuarios:', error);
        }
      });
    };
    obtenerCantidad();
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.buscarUsuarios();
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.paginas) {
      this.paginaActual++;
      this.buscarUsuarios();
    }
  }

  primeraPagina(): void {
    this.paginaActual = 1;
    this.buscarUsuarios();
  }

  ultimaPagina(): void {
    this.paginaActual = this.paginas;
    this.buscarUsuarios();
  }
    verPerfil(id: number): void {
    this.router.navigate(['/jugadores', id]);
  }
}

