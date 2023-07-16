import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Product, products } from '../../Services/mascotas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotasService } from '../../Services/mascotas.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UsuariosService } from 'src/app/Services/usuarios.service';
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

  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['iIDMascota', 'tNombreMascota', 'tEspecie', 'tRaza', 'dtFechaNacimiento', 'edit', 'delete'];
  filterValue!: string;
  isLoading: boolean = false;
  products: Product[] = products;

  iIDMascota?: number;
  tNombreMascota: string = '';
  tEspecie: string = '';
  tRaza: string = '';
  dtFechaNacimiento : string = '';

  ////// cambiar el modelo cuando este el servicio
  duenos: Product[] = [];

  boMostrarMascota: boolean = false;
  boActualizarMascota: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    public mascotaService: MascotasService
  ) { }

  submitForm() {
    // Validar el formulario
    if ( !this.tNombreMascota || !this.tEspecie || !this.tRaza) {
      // Algún campo obligatorio está vacío, mostrar mensaje de error o realizar alguna acción
      return;
    }

    const nuevaMascota: Product = {
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
    // Obtén los datos de tu archivo "product.ts" y asígnalos a la fuente de datos
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;


    // select
    this.mascotaService.getAllMascotas().subscribe(x => this.duenos = x);
    this.duenos = this.products;
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

    const nuevaMascota: Product = {
      tNombreMascota: this.tNombreMascota,
      tEspecie: this.tEspecie,
      tRaza: this.tRaza,
      iIDDuenno : this.iIDMascota,
      iIDUsuarioCreacion :1
    };

    this.mascotaService.createMascota(nuevaMascota).pipe(
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

  edit(mascotaid: Product) {
    const idMascota = mascotaid.iIDMascota
    this.mascotaService.getMascotaById(idMascota).pipe(
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

  delete(mascotaid: Product) {
    console.log(mascotaid)
    //this.boMostrarMascota = true;
    const idMascota = mascotaid.iIDMascota
    this.mascotaService.deleteMascota(mascotaid).pipe(
      catchError(error => {
        const errorCode = error?.status || 'Desconocido';
        let errorMessage = `Ocurrió un error. Código: ${errorCode}`;
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

  onNavigate(productCode: string) {
    // Lógica para la navegación a través del productCode
  }


}


