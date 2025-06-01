import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  obtenerUsuariosPorElo(filtroElo: string, paginaActual: number) {
    throw new Error('Method not implemented.');
  }
  private BASE_URL: string = 'http://localhost:3000/polichess/usuarios';

  constructor(private http: HttpClient) { }

  public obtenerUno(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  

  public obtenerAlgunosPorBusqueda(busqueda: string, pagina: number) {
    return this.http.get(`${this.BASE_URL}/pagina/${pagina}/busqueda/${busqueda}`);
  }

  public obtenerAlgunosPorElo(pagina: number, elo: string) {
    return this.http.get(`${this.BASE_URL}/pagina/${pagina}/${elo}`);
  }

  public agregar(nombre: string, apellido: string, nombre_usuario: string, contrasena_hash: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = { nombre, apellido, nombre_usuario, contrasena_hash };
    return this.http.post(this.BASE_URL, body, { headers });
  }

  public editar(usuario: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = { usuario };
    return this.http.put(`${this.BASE_URL}`, body, { headers });
  }
  obtenerPorId(id: string) {
  return this.http.get(`${this.BASE_URL}/${id}`);
}


  public eliminar(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${this.BASE_URL}/${id}`, { headers });
  }
}
