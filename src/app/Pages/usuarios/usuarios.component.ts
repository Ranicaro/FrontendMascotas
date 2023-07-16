import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Duennos, duennos } from '../../Services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('700ms ease-in')),
      transition('* => void', animate('700ms ease-out'))
    ])]
})

export class UsuariosComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'iIDTipoIdentificacion',
    'tNumeroIdentificacion',
    'tPrimerNombre',
    'tSegundoNombre',
    'tPrimerApellido',
    'tSegundoApellido',
    'tNumeroTelefono',
    'tDireccion',
    'tCorreos',
    'tContrasenna',
    'edit',
    'delete'
  ];
  filterValue = '';
  isLoading = false;
  data: any[] = [];
  products: Duennos[] = duennos;

  iIDTipoIdentificacion: number | null = null;
  tNumeroIdentificacion = '';
  tPrimerNombre = '';
  tSegundoNombre = '';
  tPrimerApellido = '';
  tSegundoApellido = '';
  tNumeroTelefono = '';
  tDireccion = '';
  tCorreos = '';
  tContrasenna = '';

  bMostrarDueno: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    public usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  submitForm() {
    if (
      !this.iIDTipoIdentificacion ||
      !this.tNumeroIdentificacion ||
      !this.tPrimerNombre ||
      !this.tPrimerApellido ||
      !this.tNumeroTelefono ||
      !this.tDireccion ||
      !this.tCorreos ||
      !this.tContrasenna
    ) {
      return;
    }

    const nuevousuario: Duennos = {
      iIDUsuario: 1,
      iIDTipoIdentificacion: this.iIDTipoIdentificacion,
      tNumeroIdentificacion: this.tNumeroIdentificacion,
      tPrimerNombre: this.tPrimerNombre,
      tSegundoNombre: this.tSegundoNombre,
      tPrimerApellido: this.tPrimerApellido,
      tSegundoApellido: this.tSegundoApellido,
      tNumeroTelefono: this.tNumeroTelefono,
      tDireccion: this.tDireccion,
      tCorreos: this.tCorreos,
      tContrasenna: this.tContrasenna
    };

    this.products.push(nuevousuario);

    this.dataSource.data = this.products;

    this.iIDTipoIdentificacion = null;
    this.tNumeroIdentificacion = '';
    this.tPrimerNombre = '';
    this.tSegundoNombre = '';
    this.tPrimerApellido = '';
    this.tSegundoApellido = '';
    this.tNumeroTelefono = '';
    this.tDireccion = '';
    this.tCorreos = '';
    this.tContrasenna = '';
  }

  ConsultarDuenos() {

    const consultarusuario: Duennos = {
      iIDUsuario: 1,
      iIDTipoIdentificacion: this.iIDTipoIdentificacion,
      tNumeroIdentificacion: this.tNumeroIdentificacion,
      tPrimerNombre: this.tPrimerNombre,
      tSegundoNombre: this.tSegundoNombre,
      tPrimerApellido: this.tPrimerApellido,
      tSegundoApellido: this.tSegundoApellido,
      tNumeroTelefono: this.tNumeroTelefono,
      tDireccion: this.tDireccion,
      tCorreos: this.tCorreos,
      tContrasenna: this.tContrasenna
    };

    this.bMostrarDueno = true;
    this.usuarioService.getAllUsuarios().pipe(
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
        this._snackBar.open("Se obtuvo resultados", "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        });
      }
    );

  }

  CrearDuenos() {

    if (
      !this.iIDTipoIdentificacion ||
      !this.tNumeroIdentificacion ||
      !this.tPrimerNombre ||
      !this.tPrimerApellido ||
      !this.tNumeroTelefono ||
      !this.tDireccion ||
      !this.tCorreos ||
      !this.tContrasenna
    ) {
      this._snackBar.open("Falta un campo, revise porfavor los campos obligatorios", "X", {
        duration: 5000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ['red-snackbar']
      });
      return;
    }

    const crearusuario: Duennos = {
      iIDUsuario: 1,
      iIDTipoIdentificacion: this.iIDTipoIdentificacion,
      tNumeroIdentificacion: this.tNumeroIdentificacion,
      tPrimerNombre: this.tPrimerNombre,
      tSegundoNombre: this.tSegundoNombre,
      tPrimerApellido: this.tPrimerApellido,
      tSegundoApellido: this.tSegundoApellido,
      tNumeroTelefono: this.tNumeroTelefono,
      tDireccion: this.tDireccion,
      tCorreos: this.tCorreos,
      tContrasenna: this.tContrasenna
    };
    this.bMostrarDueno = true;
    this.usuarioService.createUsuario(crearusuario).pipe(
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
        this._snackBar.open("Se creo el usuario", "X", {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        });
      }
    );

  }

  edit(element: any) {
    this.bMostrarDueno = false;
  }

  delete(iIDUsuario: number) {
    this.bMostrarDueno = true;
    this.usuarioService.deleteUsuario(iIDUsuario).pipe(
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
        this._snackBar.open("Se inhabilito el registro del usuario", "X", {
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

  onNavigate(productCode: string) {

  }
}
