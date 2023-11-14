import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParagraphService {
  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your Django API URL

  constructor(private http: HttpClient) { }

  createParagraph(paragraphData: any) {
    console.log("+++++++++++++++++++++",paragraphData);
    
    return this.http.post(`${this.apiUrl}/document/`, paragraphData);
  }

  createSelection(selectionData: any) {
    console.log("*********************",selectionData);
    return this.http.post(`${this.apiUrl}/annotation/`, selectionData);
  }

  getAnnotations() {
    return this.http.get(`${this.apiUrl}/annotations/`);
  }

  getDocumentById(documentId: number): Observable<any> {
    const url = `${this.apiUrl}/document/${documentId}/`;
    return this.http.get(url);
  }
}
