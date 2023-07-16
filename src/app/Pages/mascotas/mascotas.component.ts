import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Mascota, products } from '../../Services/mascotas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotasService } from '../../Services/mascotas.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Duennos, UsuariosService } from 'src/app/Services/usuarios.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('700ms ease-in')),
      transition('* => void', animate('700ms ease-out'))
    ])]
})

export class MascotasComponent implements OnInit {

  dataSource!: MatTableDataSource<Mascota>;
  displayedColumns: string[] = ['iIDMascota', 'tNombreMascota', 'tEspecie', 'tRaza', 'dtFechaNacimiento', 'iIDDuenno','edit', 'delete'];
  filterValue!: string;
  isLoading: boolean = false;
  products: Mascota[] = products;

  idMascota?: number | null;
  iIDMascota?: number;
  iIDUsuario?: number;
  tNombreMascota: string = '';
  tEspecie: string = '';
  tRaza: string = '';
  dtFechaNacimiento : string = '';
  duenos: Duennos[] = [];
  mascotaSeleccionada: Mascota | null = null;

  boMostrarMascota: boolean = false;
  boActualizarMascota: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    public mascotaService: MascotasService,
    public usuarioService: UsuariosService
  ) { }

  submitForm() {
    if ( !this.tNombreMascota || !this.tEspecie || !this.tRaza) {
      return;
    }

    const nuevaMascota: Mascota = {
      iIDMascota: this.iIDMascota,
      tNombreMascota: this.tNombreMascota,
      tEspecie: this.tEspecie,
      tRaza: this.tRaza
    };

    this.products.push(nuevaMascota);

    this.dataSource.data = this.products;


    this.iIDMascota = undefined;
    this.tNombreMascota = '';
    this.tEspecie = '';
    this.tRaza = '';
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.usuarioService.getAllUsuarios().subscribe(x => this.duenos = x);
  }

  ConsultarMascota() {
    this.mascotaService.getAllMascotas().pipe(
      catchError(error => {
        const errorCode = error?.status || 'Desconocido';
        let errorMessage = `Ocurrió un error en la consulta. Código: ${errorCode}`;
        if (errorCode === 400) {
          errorMessage = `Por favor verifique los datos ingresados. Código: ${errorCode}`;
        }
        this._snackBar.open(errorMessage, "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['red-snackbar']
        });
        return throwError(() => new Error(error));;
      })
    ).subscribe(
      (response) => {
        response
        this.boMostrarMascota = true
        this.dataSource.data = response;
        this._snackBar.open("Se obtuvo resultados", "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        });
      }
    );

  }

  CrearMascota() {
    
    if ( !this.tNombreMascota || !this.tEspecie || !this.tRaza || !this.iIDUsuario || !this.dtFechaNacimiento ) {
      this._snackBar.open("Porfavor ingrese todos los campos", "X", {
        duration: 5000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ['red-snackbar']
      });
      return;
    }
    

    const nuevaMascota: Mascota = {
      tNombreMascota: this.tNombreMascota,
      tEspecie: this.tEspecie,
      tRaza: this.tRaza,
      iIDDuenno : this.iIDUsuario,
      dtFechaNacimiento:this.dtFechaNacimiento,
      iIDUsuarioCreacion : this.iIDUsuario
    };


    this.mascotaService.createMascota(nuevaMascota).pipe(
      catchError(error => {
        const errorCode = error?.status || 'Desconocido';
        let errorMessage = `Código: ${errorCode}`;
        if (errorCode === 400) {
          errorMessage = `Por favor verifique los datos ingresados. Código: ${errorCode}`;
        }

        this._snackBar.open(errorMessage, "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['red-snackbar']
        });
        return throwError(() => new Error(error));;
      })
    ).subscribe(
      (response) => {
        response
        this.boMostrarMascota = true
        this.dataSource.data = response;
        this._snackBar.open("Se creo la mascota", "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        });
      }
    );

  }

  ActualizarMascota(){

    const modificarMascota: Mascota = {
      iIDMascota: this.idMascota,
      tNombreMascota: this.tNombreMascota,
      tEspecie: this.tEspecie,
      tRaza: this.tRaza,
      iIDDuenno : this.iIDUsuario,
      dtFechaNacimiento:this.dtFechaNacimiento,
      iIDUsuarioModificacion: 1
    };

    this.mascotaService.updateMascota(this.idMascota,modificarMascota).pipe(
      catchError(error => {
        const errorCode = error?.status || 'Desconocido';
        let errorMessage = `Código: ${errorCode}`;
        if (errorCode === 400) {
          errorMessage = `Por favor verifique los datos ingresados. Código: ${errorCode}`;
        }
        this._snackBar.open(errorMessage, "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['red-snackbar']
        });
        return throwError(() => new Error(error));;
      })
    ).subscribe(
      (response) => {
        response
        this.boMostrarMascota = true
        this.dataSource.data = response;
        this._snackBar.open("Se actualizo la mascota", "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        });
      }
    );
  }

  edit(mascotaid: Mascota) {
    this.idMascota = mascotaid.iIDMascota
    this.mascotaService.getMascotaById(this.idMascota).pipe(
      catchError(error => {
        const errorCode = error?.status || 'Desconocido';
        let errorMessage = `Ocurrió un error en la consulta. Código: ${errorCode}`;
        if (errorCode === 400) {
          errorMessage = `Por favor verifique los datos ingresados. Código: ${errorCode}`;
        }
        this._snackBar.open(errorMessage, "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['red-snackbar']
        });
        return throwError(() => new Error(error));;
      })
    ).subscribe(
      (response) => {
        response
        this.boMostrarMascota = false;
        this.boActualizarMascota = true;
        let datos = response;

        this.tNombreMascota = datos[0].tNombreMascota;
        this.tEspecie = datos[0].tEspecie;
        this.iIDMascota = datos[0].iIDMascota;
        this.tRaza = datos[0].tRaza;
        this.dtFechaNacimiento = datos[0].dtFechaNacimiento;

        console.log(datos, this.tNombreMascota)
        this._snackBar.open("Se obtuvo resultados", "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        });
      }
    );
  }

  delete(mascotaid: Mascota) {
    console.log(mascotaid)
    const idMascota = mascotaid.iIDMascota
    this.mascotaService.deleteMascota(mascotaid).pipe(
      catchError(error => {
        const errorCode = error?.status || 'Desconocido';
        let errorMessage = `Código: ${errorCode}`;
        if (errorCode === 400) {
          errorMessage = `Por favor verifique los datos ingresados. Código: ${errorCode}`;
        }
        this._snackBar.open(errorMessage, "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['red-snackbar']
        });
        return throwError(() => new Error(error));;
      })
    ).subscribe(
      (response) => {
        response
        this.boMostrarMascota = true;
        this._snackBar.open("Se inhabilito el registro de la mascota", "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        });
      }
    );
  }

  filterProduct(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  onNavigate(NombreMascota: string) {

  }


}


