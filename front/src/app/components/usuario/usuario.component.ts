import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  @Input() usuario!: any;
   constructor(private router: Router) {}

   ngOnInit(){
    console.log(this.usuario.foto_perfil);

   }

  irADetalle() {
    this.router.navigate(['/usuarios', this.usuario.id]);
  }
}
