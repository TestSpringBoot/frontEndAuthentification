import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/voitures/';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(baseUrl+id);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  Update(id, data) {
    return this.http.put('${baseUrl}/${id}', data);
  }
}
