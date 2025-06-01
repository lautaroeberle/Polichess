import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from './services/usuario/usuario.service';
import { LoginService } from './services/login/login.service';
import { AuthService } from './services/auth/auth.service';
import { EventoLoginService } from './services/evento-login/evento-login.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'PoliChess';

  public cursorEncimaCerrar: boolean = false;
  public cursorEncimaLogin: boolean = false;
  public cursorEncimaTresLineas: boolean = false;
  public logout: boolean = false;
  public navbarAchicado: boolean = false;
  public perfil: boolean = false;
  public registro: boolean = false;
  public tresLineas: boolean = false;
  public ventanaLoginRegistro: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public loginService: LoginService,
    private usuarioService: UsuarioService, public authService: AuthService,
    private eventoLoginService: EventoLoginService) {
    this.navbarAchicado = false;
  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.onWindowScroll();
    }

    this.eventoLoginService.$evento.subscribe((mensaje: string) => {
      if (mensaje === "Toggle login") {
        this.ventanaLoginRegistro = true;
      }
    });
  }

  public togglePerfil(): void {
    this.perfil = !this.perfil;
  }

  public toggleRegistro(): void {
    this.registro = !this.registro;
  }

  public toggleTresLineas(): void {
    this.tresLineas = !this.tresLineas;
  }

  public toggleVentanaLoginRegistro(logout: boolean): void {
    this.cursorEncimaCerrar = false;
    this.registro = false;
    this.logout = logout;
    this.ventanaLoginRegistro = !this.ventanaLoginRegistro;

    if (this.ventanaLoginRegistro) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  /* @HostListener('document:click', ['$event'])
  public cerrarContenedorSeccionesDesplegable(event: Event): void {
    const contenedorDesplegable = document.getElementById('contenedor-secciones-desplegable');

    if (contenedorDesplegable && !contenedorDesplegable.contains(event.target as Node)) {
      this.tresLineas = false;
    }
  } */

  @HostListener('document:click', ['$event'])
  public cerrarVentanaLoginRegistro(event: Event): void {
    const contenedorDesplegablePerfil = document.getElementById('contenedor-desplegable-perfil');
    const tres_lineas = document.getElementById('tres-lineas');
    const ventanaLoginRegistro = document.getElementById('ventana-login-registro');

    if ((contenedorDesplegablePerfil && !contenedorDesplegablePerfil.contains(event.target as Node)) ||
      (tres_lineas && !tres_lineas.contains(event.target as Node)) ||
      (ventanaLoginRegistro && !ventanaLoginRegistro.contains(event.target as Node))) {
      document.body.style.overflowY = 'auto';
      this.perfil = false;
      this.tresLineas = false;
      this.ventanaLoginRegistro = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(): void {
    if(isPlatformBrowser(this.platformId)) {
      if(window.scrollY > 0) {
        this.navbarAchicado = true;
      } else {
        this.navbarAchicado = false;
      }
    }
  }

  public async login(evento: Event, campos: string[], login: boolean) {
    evento.preventDefault();

    const usuario = (document.getElementById(campos[0]) as HTMLInputElement).value;
    const contrasena = (document.getElementById(campos[1]) as HTMLInputElement).value;

    this.loginService.login(usuario, contrasena).subscribe({
      next: (res: any) => {
        this.loginService.setToken(res.token);
        const decoded: { id: number; isAdmin: boolean } = jwtDecode(res.token);

        this.usuarioService.obtenerUno(decoded.id).subscribe({
          next: (data: any) => {
            this.authService.setUsuario(data);

            if (login) {
              alert("Login exitoso");
            }
            
            window.location.reload();
            // this.usuarioActual = data;
          },
          error: (err) => {
            console.log(err);
            if (err.status === 401) {
              alert("Credenciales incorrectas");
            } else {
              alert("Error en el servidor. Inténtalo más tarde.");
            }
          }
        });
        // this.ventanaLoginRegistro = false;
        // document.body.style.overflowY = 'auto';
      },
      error: (err) => {
        console.log(err);
        if (err.status === 401) {
          alert("Credenciales incorrectas");
        } else {
          alert("Error en el servidor. Inténtalo más tarde.");
        }
      }
    });
  }

  public registrarse(evento: Event) {
    evento.preventDefault();

    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const apellido = (document.getElementById('apellido') as HTMLInputElement).value;
    const usuario = (document.getElementById('usuario2') as HTMLInputElement).value;
    const contrasena = (document.getElementById('contrasena2') as HTMLInputElement).value;
    const confirmarContrasena = (document.getElementById('contrasena3') as HTMLInputElement).value;

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    this.usuarioService.agregar(nombre, apellido, usuario, contrasena).subscribe({
      next: (res: any) => {
        alert("Registro exitoso");

        this.login(evento, ['usuario2', 'contrasena2'], false);

        // this.ventanaLoginRegistro = false;
        // document.body.style.overflowY = 'auto';
      },
      error: (err) => {
        console.error(err);
        if (err.status === 409) {
          alert("El nombre de usuario ya está en uso");
        } else {
          alert("Error en el servidor. Inténtalo más tarde.");
        }
      }
    });
  }

}
