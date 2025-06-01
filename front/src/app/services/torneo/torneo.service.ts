import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private BASE_URL: string = 'http://localhost:3000/polichess/torneos';

  constructor(private http: HttpClient) { }

  public obtenerUno(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

 public obtenerAlgunos(pagina: number) {
  return this.http.get(`${this.BASE_URL}/pagina/${pagina}`);
}


  public obtenerAlgunosPorBusquda(pagina:number, busqueda: string) {
    return this.http.get(`${this.BASE_URL}/pagina/${pagina}/busqueda/${busqueda}`);
  }

  public obtenerAlgunosPorRitmo(pagina: number, ritmo: string) {
    return this.http.get(`${this.BASE_URL}/pagina/${pagina}/${ritmo}`);
  }

  public agregar(torneo: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = torneo;
    return this.http.post(this.BASE_URL, body, { headers });
  }

  public editar(torneo: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = torneo;
    return this.http.put(this.BASE_URL, body, { headers });
  }

  public eliminar(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${this.BASE_URL}/${id}`, { headers });
  }
  // aca
public obtenerPorId(id: number) {
  return this.http.get(`${this.BASE_URL}/${id}`);
}
public obtenerProximos() {
  return this.http.get(`${this.BASE_URL}/proximos`);
}


}
