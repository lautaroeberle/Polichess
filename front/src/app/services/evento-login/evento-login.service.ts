import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoLoginService {
  private eventoSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  $evento: Observable<string> = this.eventoSubject.asObservable();

  constructor() { }

  public emitirEvento(mensaje: string): void {
    this.eventoSubject.next(mensaje);
  }
}
