import { Component, HostListener  } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  lastScrollTop = 0;
  isNavbarHidden = false;
  menuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      this.isNavbarHidden = true;
    } else {
      this.isNavbarHidden = false;
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
