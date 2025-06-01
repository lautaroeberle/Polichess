import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private BASE_URL: string = 'http://localhost:3000/polichess/noticias';

  constructor(private http: HttpClient) { }

  public obtenerUno(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  public obtenerAlgunos(pagina: number) {
    return this.http.get(`${this.BASE_URL}/pagina/${pagina}`)
  }

  public obtenerAlgunosPorBusqueda(busqueda: string, pagina: number) {
    return this.http.get(`${this.BASE_URL}/pagina/${pagina}/busqueda/${busqueda}`)
  }

  public agregar(noticia: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = noticia;
    return this.http.post(this.BASE_URL, body, { headers });
  }

  public editar(noticia: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = noticia;
    return this.http.put(this.BASE_URL, body, { headers });
  }

  public eliminar(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(this.BASE_URL, { headers });
  }
}
