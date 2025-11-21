import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  private apiUrl = 'https://portal-paciente-api.vercel.app/api/'; // ← CAMBIA ESTO
// ]private apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/datos`);
  }

  login(rut: string, password_sha256: string): Observable<any> {
    
    return this.http.post(`${this.apiUrl}`+'login', {
      rut,
      password_sha256
    });
  }
}
