import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainSectionComponent } from "./main-section/main-section.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, MainSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Rent-Car';
  menuOpen = false;

  onMenuStateChange(isOpen: boolean) {
    this.menuOpen = isOpen;
  }

}
