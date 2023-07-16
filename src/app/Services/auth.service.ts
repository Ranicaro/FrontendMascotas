import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://api.example.com/mascotas'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  login(login: any) {
    return this.http.post<any>(this.apiUrl, login);
  }
}
