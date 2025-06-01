import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private BASE_URL: string = "http://localhost:3000/polichess";

  constructor(private http: HttpClient) { }

  public obtenerUno(id: number) {
    return this.http.get(`${this.BASE_URL}/comentarios/${id}`)
  }

  public obtenerTotal(idNoticia: number) {
    return this.http.get(`${this.BASE_URL}/noticias/${idNoticia}/comentarios`);
  }

  public obtenerAlgunosPorASC(idNoticia: number, pagina: number) {
    return this.http.get(`${this.BASE_URL}/noticias/${idNoticia}/comentarios/asc/pagina/${pagina}`);
  }

  public obtenerAlgunosPorDESC(idNoticia: number, pagina: number) {
    return this.http.get(`${this.BASE_URL}/noticias/${idNoticia}/comentarios/desc/pagina/${pagina}`)
  }

  public agregar(comentario: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = comentario;
    return this.http.post(`${this.BASE_URL}/comentarios`, body, { headers });
  }

  public editar(comentario: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = comentario;
    return this.http.put(`${this.BASE_URL}/comentarios`, body, { headers });
  }

  public eliminar(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${this.BASE_URL}/comentarios/${id}`, { headers });
  }

}
