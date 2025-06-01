import { NgIf, NgClass } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { LoginService } from '../../services/login/login.service';
import { ComentarioService } from '../../services/comentario/comentario.service';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule
  ],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent {
  @Input() public comentario: any;
  public usuario: any = null;
  public noticia: any;
  public fechaPublicacion: string = "Desconocida";
  public fechaActualizacion: string = "Desconocida";
  public expandido: boolean = false;

  public editando: boolean = false;
  public eliminando: boolean = false;
  public cursorEncimaCerrar: boolean = false;

  public valorInicial: string = "";
  public contenidoInvalido: boolean = false;

  constructor(private usuarioService: UsuarioService, private noticiaService: NoticiaService,
    public loginService: LoginService, private comentarioService: ComentarioService) { }

  ngOnInit(): void {
    if (this.comentario.usuario_id !== null) {
      this.usuarioService.obtenerUno(this.comentario.usuario_id).subscribe({
        next: (usuario: any) => {
          this.usuario = usuario;
        },
        error: (error) => {
          console.error("Error obteniendo autor:", error);
          this.usuario = {};
        }
      });
    }

    this.noticiaService.obtenerUno(this.comentario.noticia_id).subscribe({
      next: (noticia: any) => {
        this.noticia = noticia;
      },
      error: (error) => {
        console.error("Error obteniendo noticia:", error);
        this.noticia = {};
      }
    });

    this.fechaPublicacion = this.formatearFecha(this.comentario.createdAt);
    this.fechaActualizacion = this.formatearFecha(this.comentario.updatedAt);
  }

  @HostListener('document:click', ['$event'])
  public cerrarPopupEliminar(event: Event): void {
    const ventanaPopupEliminar: HTMLElement = document.getElementById('ventana-popup-eliminar') as HTMLElement;

    if (this.eliminando && !ventanaPopupEliminar.contains(event.target as Node)) {
      this.eliminando = false;
      document.body.style.overflowY = 'auto';
    }
  }

  public formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);

    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getUTCFullYear().toString().slice(-2);
    const horas = fecha.getUTCHours().toString().padStart(2, '0');
    const minutos = fecha.getUTCMinutes().toString().padStart(2, '0');

    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
  }

  public esLargo(): boolean {
    const lineas: number = this.comentario.contenido.split('\n').length;
    return lineas > 3;
  }

  public toggleExpandido(): void {
    this.expandido = !this.expandido;
  }

  public toggleEditando(): void {
    this.editando = !this.editando;

    if (this.editando) {
      this.valorInicial = this.comentario.contenido;
      this.validarContenido(this.valorInicial);
    }
  }

  public validarContenido(valor: string): void {
    this.contenidoInvalido = (valor === "" || /^[\s\n\r]*$/.test(valor));
    console.log(this.contenidoInvalido);
  }

  public toggleEliminando(): void {
    this.eliminando = !this.eliminando;
    this.cursorEncimaCerrar = false;

    if (this.eliminando) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  public editar(): void {
    const id: number = this.comentario.id;
    const usuario_id: number = this.usuario.id;
    const noticia_id: number = this.noticia.id;
    const contenido: string = (document.getElementById("nuevo-contenido") as HTMLTextAreaElement).value;
    const comentario: any = { id, usuario_id, noticia_id, contenido};

    this.comentarioService.editar(comentario).subscribe({
      next: () => {
        alert("Comentario editado correctamente.");
        window.location.reload();
      },
      error: (err: any) => {
        alert("Ocurrió un error al editar el comentario.");
        console.error(err);
      }
    });
  }

  public eliminar(): void {
    this.comentarioService.eliminar(this.comentario.id).subscribe({
      next: () => {
        alert("Comentario eliminado correctamente.");
        window.location.reload();
      },
      error: (err: any) => {
        alert("Ocurrió un error al eliminar el comentario.");
        console.error(err);
      }
    });
  }
}
