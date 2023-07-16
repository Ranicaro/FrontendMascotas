import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { MascotasComponent } from 'src/app/Pages/mascotas/mascotas.component';
import { UsuariosComponent } from 'src/app/Pages/usuarios/usuarios.component';

const routes: Routes = [{
    path: '', component: NavbarComponent, children: [
      // ...Otras rutas
      { path: 'login', component: LoginComponent },
      { path: 'mascota', component: MascotasComponent },
      { path: 'usuario', component: UsuariosComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
    LoginComponent,
    NavbarComponent,
    MascotasComponent,
    UsuariosComponent
  ],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
