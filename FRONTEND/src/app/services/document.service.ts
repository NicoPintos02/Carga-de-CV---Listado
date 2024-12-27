import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:8080/api/documents'; //URL del Backend

  constructor(private http: HttpClient) {}

  // Obtener todos los documentos
  getAllDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Buscar documentos por palabras clave
  searchDocuments(keywords: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?keywords=${keywords}`);
  }

  // Subir un documento al servidor
  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
