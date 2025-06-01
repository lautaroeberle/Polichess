import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { TorneoService } from '../../services/torneo/torneo.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  noticias: any[] = [];
  torneos: any[] = [];
  usuarios: any[] = [];

  constructor(
    private noticiaService: NoticiaService,
    private torneoService: TorneoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.noticiaService.obtenerAlgunos(1).subscribe(data => this.noticias = data as any[]);
    this.torneoService.obtenerAlgunos(1).subscribe(data => this.torneos = data as any[]);
    this.usuarioService.obtenerAlgunosPorBusqueda('', 1).subscribe(data => this.usuarios = data as any[]);
  }

  verMas(): void {
    document.getElementById("noticias")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}
