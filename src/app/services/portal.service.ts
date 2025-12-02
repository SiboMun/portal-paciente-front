import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  // PRODUCCIÓN:
  // private apiUrl = 'https://portal-paciente-api.vercel.app/api';

  // LOCAL:
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(rut: string, password_sha256: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { rut, password_sha256 });
  }

  getPaciente(identificador: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/paciente/${identificador}`);
  }

  getPacientesTotal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pacientes/total`);
  }

  getPacientesGuardados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pacientes/guardados`);
  }

  getAnterioresAtenciones(identificador: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/anteriores-atenciones/${identificador}`);
  }

  getResultadosTotales(identificador: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/resultados/${identificador}`);
  }

  getProximasAtenciones(identificador: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/proximas-atenciones/${identificador}`);
  }

  getSolicitudesLaboratorio(identificador: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes-laboratorio/${identificador}`);
  }

  getSolicitudesTotal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes/total`);
  }

  getRetroalimentacionTotal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/retroalimentacion/total`);
  }

}
