import { Location, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ComentarioService } from '../../services/comentario/comentario.service';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/auth/auth.service';
import { EventoLoginService } from '../../services/evento-login/evento-login.service';
import { LimitLineBreak } from '../../directives/limit-line-break.directive';
import { ComentarioComponent } from '../comentario/comentario.component';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [
    ComentarioComponent,
    NgIf,
    NgFor,
    LimitLineBreak
  ],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css'
})
export class NoticiaComponent {
  public noticia: any;
  public autor: any;
  public fechaPublicacion: string = "Desconocida";
  public fechaActualizacion: string = "Desconocida";
  public totalComentarios: number = 0;
  public maxLineas: number = 15;
  public contenidoInvalido: boolean = true;
  public comentarios: any[] = [];
  public paginaActual: number = 1;

  constructor(private location: Location, private route: ActivatedRoute, private noticiaService: NoticiaService,
    private usuarioService: UsuarioService, private comentarioService: ComentarioService, public loginService: LoginService,
    public authService: AuthService, private eventoLoginService: EventoLoginService,
    public limitLineBreak: LimitLineBreak) { }

  ngOnInit() {
    this.noticiaService.obtenerUno(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: (noticia) => {
        this.noticia = noticia;
        this.fechaPublicacion = this.formatearFecha(this.noticia.createdAt);
        this.fechaActualizacion = this.formatearFecha(this.noticia.updatedAt);

        this.usuarioService.obtenerUno(this.noticia.autor_id).subscribe({
          next: (autor) => {
            this.autor = autor;
          },
          error: (error) => {
            console.error("Error obteniendo autor:", error);
            this.autor = {};
          }
        });

        this.comentarioService.obtenerTotal(this.noticia.id).subscribe({
          next: (total: any) => {
            this.totalComentarios = total;
          },
          error: (error) => {
            console.error("Error obteniendo total de comentarios:", error);
            this.totalComentarios = 0;
          }
        });

        this.comentarioService.obtenerAlgunosPorDESC(this.noticia.id, this.paginaActual).subscribe({
          next: (comentarios: any) => {
            this.comentarios = comentarios;
          },
          error: (error) => {
            console.error("Error obteniendo comentarios:", error);
            this.comentarios = [];
          }
        });
      },
      error: (error) => {
        console.error("Error obteniendo noticia:", error);
        this.noticia = {};
      }
    });
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

  public volver(): void {
    this.location.back();
  }

  public toggleLogin(input: HTMLTextAreaElement): void {
    input.blur();
    this.eventoLoginService.emitirEvento("Toggle login");
  }

  public comentar(): void {
    const usuario_id: number | null = this.loginService.getUsuarioId();
    const noticia_id: number = this.noticia.id;
    const contenido: string = (document.getElementById("contenido") as HTMLInputElement).value;
    const comentario: any = { usuario_id, noticia_id, contenido };

    this.comentarioService.agregar(comentario).subscribe({
      next: () => {
        alert("Comentario agregado correctamente.");
        window.location.reload();
      },
      error: (err: any) => {
        alert("Ocurrió un error al crear el comentario.");
        console.error(err);
      }
    });
  }

  public bloquearInput(e: Event): void {
    e.preventDefault();
  }

  public validarContenido(valor: string): void {
    this.contenidoInvalido = (valor === "" || /^[\s\n\r]*$/.test(valor));
  }

  public limpiarContenido(): void {
    const input: HTMLTextAreaElement = document.getElementById("contenido") as HTMLTextAreaElement;
    input.value = "";
    input.blur();
    this.validarContenido(input.value);
  }
}
