import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-torneo',
  standalone: true,
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css'],
  imports: [CommonModule, RouterModule],
})
export class TorneoComponent {
  @Input() torneo!: any;
}
