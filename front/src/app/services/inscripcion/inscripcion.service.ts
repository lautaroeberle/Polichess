import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private BASE_URL: string = "http://localhost:3000/polichess"; 

  constructor(private http: HttpClient) { }

  public obtenerUno(id: number) {
    return this.http.get(`${this.BASE_URL}/inscripciones/${id}`);
  }

public obtenerAlgunos(torneoId: number, pagina: number) {
  console.log(`${this.BASE_URL}/torneos/${torneoId}/inscripciones/pagina/${pagina}`);
  return this.http.get(`${this.BASE_URL}/torneos/${torneoId}/inscripciones/pagina/${pagina}`);
}


  public obtenerInscritosConNombre(idTorneo: number, pagina: number) {
  return this.http.get(`${this.BASE_URL}/torneos/${idTorneo}/inscripciones/pagina/${pagina}`);
}
public obtenerPorTorneoConUsuarios(idTorneo: number) {
  return this.http.get(`${this.BASE_URL}/polichess/torneos/${idTorneo}/inscripciones`);
}



  public agregar(inscripcion: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // ✅ Se incluye el token JWT
    });

    const body = inscripcion;
    return this.http.post(`${this.BASE_URL}/inscripciones`, body, { headers }); // ✅ URL corregida
  }

  public editar(inscripcion: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    });

    const body = inscripcion;
    return this.http.put(`${this.BASE_URL}/inscripciones`, body, { headers });
  }

  public eliminar(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });

    return this.http.delete(`${this.BASE_URL}/inscripciones/${id}`, { headers }); 
  }
  public verificarInscripcion(usuarioId: number, torneoId: number) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  return this.http.get<{ inscrito: boolean }>(`http://localhost:3000/inscripciones/torneo/${torneoId}/usuario/${usuarioId}`, { headers });
}

}
