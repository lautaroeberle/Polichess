import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [],
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {
  usuario: any;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const usuarioId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la URL
    if (usuarioId) {
      this.usuarioService.obtenerPorId(usuarioId).subscribe({
        next: (data) => {
          this.usuario = data;
          console.log('Usuario cargado:', this.usuario); // Para debuguear
        },
        error: (err) => console.error('Error al obtener usuario', err)
      });
    }
    
  }
}
