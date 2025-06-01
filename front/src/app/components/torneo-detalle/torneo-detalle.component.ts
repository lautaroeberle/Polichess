import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TorneoService } from '../../services/torneo/torneo.service';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InscripcionService } from '../../services/inscripcion/inscripcion.service';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-torneo-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './torneo-detalle.component.html',
  styleUrls: ['./torneo-detalle.component.css']
})
export class TorneoDetalleComponent implements OnInit {
  torneo: any;
  location: any;
  usuarioLogueado: boolean = false;
  idUsuario: number | null = null;
  inscrito: boolean = false;
jugadoresInscritos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private torneoService: TorneoService,
    private inscripcionService: InscripcionService,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioLogueado = this.loginService.isAuthenticated();
    this.idUsuario = this.loginService.getUsuarioId();

    this.torneoService.obtenerUno(id).subscribe((data) => {
      this.torneo = data;

      if (this.usuarioLogueado && this.idUsuario && this.torneo?.id) {
        this.inscripcionService.verificarInscripcion(this.idUsuario, this.torneo.id).subscribe({
          next: (res) => this.inscrito = res.inscrito,
          error: (err) => console.error('Error al verificar inscripción:', err)
        });
      }

     

this.inscripcionService.obtenerAlgunos(this.torneo.id, 1).subscribe({
  next: (res: any) => {
    this.jugadoresInscritos = res;
    console.log("🟢 Inscritos al torneo actual:", res);
  },
  error: (err) => {
    console.error("🔴 Error al obtener inscritos:", err);
  }
});




    });
  }

  inscribirse() {
    if (!this.usuarioLogueado || !this.idUsuario || !this.torneo?.id) return;
    
    if(this.torneo.ritmo==="Estándar"){ 
     if (this.authService.getUsuario().elo_estandar<this.torneo.minimo_elo || this.authService.getUsuario().elo_estandar>this.torneo.maximo_elo){
      alert("No cumplis con los requisitos de elo, bro;");
      return;
     }
}
if(this.torneo.ritmo==="Rápido"){ 
      if (this.authService.getUsuario().elo_rapido<this.torneo.minimo_elo || this.authService.getUsuario().elo_rapido>this.torneo.maximo_elo){
      alert("No cumplis con los requisitos de elo, bro; estuvo buena");
      return;
     }
}
if(this.torneo.ritmo==="Blitz"){ 
      if (this.authService.getUsuario().elo_blitz<this.torneo.minimo_elo || this.authService.getUsuario().elo_blitz>this.torneo.maximo_elo){
      alert("No cumplis con los requisitos de elo, bro;buena empleador");
      return;
     }
}
if(this.jugadoresInscritos.length===this.torneo.maximo_jugadores){
  alert("ya está todo lleno mal ahi");
  return;
}
    this.inscripcionService.agregar({ torneo_id: this.torneo.id }).subscribe({
      next: () => {
        this.inscrito = true;
        alert("Inscripción exitosa."); 
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
        alert("Ocurrió un error al inscribirse.");
      }
    });
  
  }
  volver() {
    this.location.back();
  }
}
