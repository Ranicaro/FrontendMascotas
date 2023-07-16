import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private http: HttpClient) { }

  getAllMascotas() {
    return this.http.get<any[]>("https://localhost:44334/GetListarMascotas");
  }

  getMascotaById(iIDMascota: number | null | undefined) {
    return this.http.post<any>("https://localhost:44334/PostListarMascotasId", {
      "iIDMascota": iIDMascota
    });
  }

  createMascota(nuevaMascota: any) {
    return this.http.post<any>("https://localhost:44334/PostCrearMascota", nuevaMascota);
  }

  updateMascota(iIDMascota: number | null | undefined, mascota: any) {
    const url = `${"https://localhost:44334/PutEditarMascota"}/${iIDMascota}`;
    return this.http.put<any>("https://localhost:44334/PutEditarMascota", mascota);
  }

  deleteMascota(mascota: Mascota) {
    const url = `${"https://localhost:7187/DeleteEliminarMascota"}/${mascota.iIDMascota}`;
    return this.http.delete<any>("https://localhost:44334/DeleteEliminarMascota", { body: mascota });
  }

}


export interface Mascota {
  iIDMascota?: number | null;
  tNombreMascota: string;
  tEspecie: string;
  tRaza?: string;
  dtFechaNacimiento?: string;
  iIDDuenno?: number,
  iIDUsuarioCreacion?: number,
  iIDUsuarioModificacion?: number
}

export const products: Mascota[] = [
  {
    iIDMascota: 1,
    tNombreMascota: 'Netgear Cable Modem',
    tEspecie: 'CM700',
    tRaza: 'Netgear Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.0'
  },
  {
    iIDMascota: 2,
    tNombreMascota: 'Linksys Cable Modem',
    tEspecie: 'LK700',
    tRaza: 'Linksys Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.1'
  },
  {
    iIDMascota: 3,
    tNombreMascota: 'TP Link Cable Modem',
    tEspecie: 'TPL700',
    tRaza: 'TP Link Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.2'
  },
  {
    iIDMascota: 4,
    tNombreMascota: 'Netgear Cable Modem',
    tEspecie: 'CM700',
    tRaza: 'Netgear Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.0'
  },
  {
    iIDMascota: 5,
    tNombreMascota: 'Linksys Cable Modem',
    tEspecie: 'LK700',
    tRaza: 'Linksys Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.1'
  },
  {
    iIDMascota: 6,
    tNombreMascota: 'TP Link Cable Modem',
    tEspecie: 'TPL700',
    tRaza: 'TP Link Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.2'
  },
  {
    iIDMascota: 7,
    tNombreMascota: 'Netgear Cable Modem',
    tEspecie: 'CM700',
    tRaza: 'Netgear Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.0'
  },
  {
    iIDMascota: 8,
    tNombreMascota: 'Linksys Cable Modem',
    tEspecie: 'LK700',
    tRaza: 'Linksys Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.1'
  },
  {
    iIDMascota: 9,
    tNombreMascota: 'TP Link Cable Modem',
    tEspecie: 'TPL700',
    tRaza: 'TP Link Cable Modem compatible with all cables',
    dtFechaNacimiento: '4.2'
  },
];
