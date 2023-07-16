import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  opened: boolean;

  constructor() {
    this.opened = false;
  }

  clickHandler() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

}
