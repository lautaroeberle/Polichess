import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-carta-noticia',
  standalone: true,
  imports: [],
  templateUrl: './carta-noticia.component.html',
  styleUrl: './carta-noticia.component.css'
})
export class CartaNoticiaComponent implements OnInit {
  @Input() public noticia!: any;
  public autorNombre: string = "Desconocido";

  constructor(public usuarioService: UsuarioService) { }

  async ngOnInit(): Promise<void> {
    this.usuarioService.obtenerUno(this.noticia.autor_id).subscribe({
      next: (autor: any) => {
        this.autorNombre = `${autor.nombre} ${autor.apellido}`;
      },
      error: (error) => {
        console.error("Error obteniendo autor:", error);
      }
    });
  }

  public formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear().toString().slice(-2);
    return `${dia}/${mes}/${anio}`;
  }
}
