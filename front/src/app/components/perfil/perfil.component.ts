import { CommonModule, Location, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ImagenService } from '../../services/imagen/imagen.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  title = "Mi perfil";
  public eloEstandar: string = "";
  public eloRapido: string = "";
  public eloBlitz: string = "";

  public editar: boolean = false;
  public eliminar: boolean = false;
  public confirmarEdicion: boolean = false;

  public cursorEncimaCerrar: boolean = false;

  public foto_perfil: string = '';
  public nombre: string = '';
  public apellido: string = '';
  public nombre_usuario: string = '';
  public fecha_nacimiento: string = '';

  constructor(public authService: AuthService, public loginService: LoginService, public location: Location,
    public usuarioService: UsuarioService, public imagenService: ImagenService) { }

  ngOnInit() {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.foto_perfil = `http://localhost:3000${this.authService.getUsuario()!.foto_perfil}`;
      this.nombre = usuario.nombre || '';
      this.apellido = usuario.apellido || '';
      this.nombre_usuario = usuario.nombre_usuario || '';
      this.fecha_nacimiento = usuario.fecha_nacimiento || '';
      this.eloEstandar = usuario.elo_estandar.split('.')[0];
      this.eloRapido = usuario.elo_rapido.split('.')[0];
      this.eloBlitz = usuario.elo_blitz.split('.')[0];
    }
  }

  @HostListener('document:click', ['$event'])
  public cerrarVentanaPopup(event: Event): void {
    const ventanaPopupEliminar: HTMLElement = document.getElementById("ventana-popup-eliminar") as HTMLElement;
    const ventanaPopupConfirmar: HTMLElement = document.getElementById("ventana-popup-confirmar") as HTMLElement;

    if ((this.eliminar && !ventanaPopupEliminar.contains(event.target as Node) && !ventanaPopupConfirmar.contains(event.target as Node)) ||
      (this.confirmarEdicion && !ventanaPopupConfirmar.contains(event.target as Node))) {
      this.eliminar = false;
      this.confirmarEdicion = false;
      document.body.style.overflowY = 'auto';
    }
  }

  public volver(): void {
    this.location.back();
  }

  public toggleEditar(): void {
    this.editar = !this.editar;
  }

  public toggleConfirmarEdicion(): void {
    this.confirmarEdicion = !this.confirmarEdicion;
    this.cursorEncimaCerrar = false;

    if (this.confirmarEdicion) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  public async compararContrasenas() {
    const contrasena = (document.getElementById("contrasena") as HTMLInputElement).value;

    this.loginService.login(this.authService.getUsuario()!.nombre_usuario, contrasena).subscribe({
      next: () => {
        if (this.editar) {
          this.editarPerfil();
        } else if (this.eliminar) {
          this.eliminarPerfil();
        }
        this.toggleConfirmarEdicion();
      },
      error: () => {
        alert("La contraseña ingresada es incorrecta.");
      }
    });
      
  }

  public toggleEliminar(): void {
    this.eliminar = !this.eliminar;
    this.cursorEncimaCerrar = false;

    if (this.eliminar) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  public eliminarPerfil(): void {
    this.usuarioService.eliminar(this.authService.getUsuario()!.id).subscribe(() => {
      this.authService.logout();
      this.loginService.logout();
    });
  }

  public previewUrl: string | null = null;
  public selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Previsualizar la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  public borrarImagen(): void {
    (document.getElementById("fileInput") as HTMLInputElement).value = "";
    this.previewUrl = null;
    this.selectedFile = null;
  }

  public async editarPerfil() {
    if (!this.nombre.trim() || !this.apellido.trim() || !this.nombre_usuario.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const usuario = this.authService.getUsuario();
    if (!usuario) {
      console.error("No se encontró un usuario autenticado.");
      return;
    }

    if (this.selectedFile) {
      this.imagenService.subirImagenPerfil(this.selectedFile);
    }

    let nuevaContrasena: string | null = (document.getElementById("nueva-contrasena") as HTMLInputElement).value || null;
    const usuarioEditado = {
      id: this.authService.getUsuario()!.id,
      nombre: this.nombre,
      apellido: this.apellido,
      nombre_usuario: this.nombre_usuario,
      contrasena_hash: nuevaContrasena ? nuevaContrasena : undefined,
      fecha_nacimiento: this.fecha_nacimiento ? this.fecha_nacimiento.replace(/\//g, "-") : null
    };

    this.usuarioService.editar(usuarioEditado).subscribe({
      next: () => {
        alert("Perfil editado exitosamente.");
        const decoded: { id: number; isAdmin: boolean } = jwtDecode(localStorage.getItem("token")!);
        this.usuarioService.obtenerUno(decoded.id).subscribe({
          next: (data: any) => {
            this.authService.setUsuario(data);
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            alert("Error en el servidor. Inténtalo más tarde.");
          }
        });
        
      },
      error: (err) => {
        console.error(err);
        alert("Error en el servidor. Inténtalo más tarde.");
      }
    });
  }
}
