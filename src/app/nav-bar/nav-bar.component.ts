import { Component, HostListener ,  ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

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
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.menuOpen && this.mobileMenu && !this.mobileMenu.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }

}
