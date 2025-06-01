import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CrearTorneoComponent } from './components/crear-torneo/crear-torneo.component';
import { CrearNoticiaComponent } from './components/crear-noticia/crear-noticia.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { TorneosComponent } from './components/torneos/torneos.component';
import { TorneoDetalleComponent } from './components/torneo-detalle/torneo-detalle.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/inicio",
    pathMatch: "full"
  },
  {
    path: "inicio",
    component: InicioComponent
  },
  {
    path: "perfil",
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "noticias",
    component: NoticiasComponent
  },
  {
    path: "noticias/:id",
    component: NoticiaComponent
  },
  {
    path: "creartorneo",
    component: CrearTorneoComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {path: "calendario",
    component: CalendarioComponent

  },
  {
    path: "crearnoticia",
    component: CrearNoticiaComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
 {
  path: 'usuarios',
  component: UsuariosComponent
},
{
  path: 'usuarios/:id',
  component: UsuarioDetalleComponent
},
{ path: 'torneos', component: TorneosComponent },

  { path: 'torneos/:id', component: TorneoDetalleComponent },


  

];
