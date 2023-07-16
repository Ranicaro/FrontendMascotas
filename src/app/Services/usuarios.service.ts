import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://api.example.com/usuarios'; 

  constructor(private http: HttpClient) { }

  getAllUsuarios() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuarioById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createUsuario(crearUsuario:Product) {
    return this.http.post<any>("localhost:44334/PostCrearUsuarios", crearUsuario);
  }

  updateUsuario(id: number, usuario: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, usuario);
  }

  deleteUsuario(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

}

export interface Product {
  iIDTipoIdentificacion: number | null;
  tNumeroIdentificacion: string;
  tPrimerNombre: string;
  tSegundoNombre: string;
  tPrimerApellido: string;
  tSegundoApellido: string;
  tNumeroTelefono: string;
  tDireccion: string;
  tCorreos: string;
  tContrasenna: string;
}

export const products: Product[] = [
  {
      iIDTipoIdentificacion: 1,
      tNumeroIdentificacion: '1234567890',
      tPrimerNombre: 'John',
      tSegundoNombre: 'Doe',
      tPrimerApellido: 'Smith',
      tSegundoApellido: 'Johnson',
      tNumeroTelefono: '1234567890',
      tDireccion: '123 Main St',
      tCorreos: 'john@example.com',
      tContrasenna: 'password1'
  },
  {
      iIDTipoIdentificacion: 2,
      tNumeroIdentificacion: '0987654321',
      tPrimerNombre: 'Jane',
      tSegundoNombre: 'Doe',
      tPrimerApellido: 'Johnson',
      tSegundoApellido: 'Smith',
      tNumeroTelefono: '9876543210',
      tDireccion: '456 Elm St',
      tCorreos: 'jane@example.com',
      tContrasenna: 'password2'
  },
  {
      iIDTipoIdentificacion: 3,
      tNumeroIdentificacion: '9876543210',
      tPrimerNombre: 'Mike',
      tSegundoNombre: 'Doe',
      tPrimerApellido: 'Brown',
      tSegundoApellido: 'Miller',
      tNumeroTelefono: '5678901234',
      tDireccion: '789 Oak St',
      tCorreos: 'mike@example.com',
      tContrasenna: 'password3'
  },
  {
      iIDTipoIdentificacion: 4,
      tNumeroIdentificacion: '4567890123',
      tPrimerNombre: 'Sarah',
      tSegundoNombre: 'Doe',
      tPrimerApellido: 'Wilson',
      tSegundoApellido: 'Davis',
      tNumeroTelefono: '8901234567',
      tDireccion: '321 Pine St',
      tCorreos: 'sarah@example.com',
      tContrasenna: 'password4'
  },
  {
      iIDTipoIdentificacion: 5,
      tNumeroIdentificacion: '2345678901',
      tPrimerNombre: 'Chris',
      tSegundoNombre: 'Doe',
      tPrimerApellido: 'Taylor',
      tSegundoApellido: 'Anderson',
      tNumeroTelefono: '4567890123',
      tDireccion: '567 Cedar St',
      tCorreos: 'chris@example.com',
      tContrasenna: 'password5'
  },
];
