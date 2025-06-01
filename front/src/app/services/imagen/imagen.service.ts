import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private BASE_URL: string = 'http://localhost:3000/polichess/subirimagen';

  constructor(private http: HttpClient, private authService: AuthService, private usuarioService: UsuarioService) { }

  public subirImagenPerfil(selectedFile: File): void {
    if (!selectedFile) {
      alert("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    this.http.post<{ path: string }>(this.BASE_URL, formData).subscribe({
      next: (res: any) => {
        const id: number = this.authService.getUsuario().id;
        const foto_perfil: string = `${res.path}`;
        this.usuarioService.editar({ id, foto_perfil }).subscribe({
          next: (res: any) => {
            this.usuarioService.obtenerUno(this.authService.getUsuario().id).subscribe({
              next: (res: any) => {
                this.authService.setUsuario(res);
              },
              error: (err: any) => {
                alert("Ocurrió un error al obtener el usuario.");
                console.error(err);
              }
            });
          },
          error: (err: any) => {
            alert("Ocurrió un error al actualizar la imagen de perfil.");
            console.error(err);
          }
        });

        alert("Imagen subida correctamente.");
      },
      error: (err: any) => {
        alert("Ocurrió un error al subir la imagen.");
        console.error(err);
      }
    });
  }

  public async subirImagenNoticia(selectedFile: File | null): Promise<string | null> {
    if (!selectedFile) {
      alert("No se ha seleccionado ningún archivo.");
      return null;
    }

    if (!selectedFile) {
      alert("No se ha seleccionado ningún archivo.");
      return null;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const res = await lastValueFrom(this.http.post<{ path: string }>(this.BASE_URL, formData));
      alert("Imagen subida correctamente.");
      return res.path;
    } catch (err) {
      alert("Ocurrió un error al subir la imagen.");
      console.error(err);
      return null;
    }
  }

}
