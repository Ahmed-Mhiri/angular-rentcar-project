import { Component, HostListener, ElementRef, ViewChild, Renderer2, RendererFactory2, Inject, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnDestroy, AfterViewInit {

  lastScrollTop = 0;
  isNavbarHidden = false;
  menuOpen = false;
  viewInitialized = false;

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @Output() menuStateChange = new EventEmitter<boolean>();

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) public document: any
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      this.isNavbarHidden = true;
    } else {
      this.isNavbarHidden = false;
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuStateChange.emit(this.menuOpen);

    if (this.document && this.document.body) {
      if (this.menuOpen) {
        this.renderer.addClass(this.document.body, 'no-scroll');
      } else {
        this.renderer.removeClass(this.document.body, 'no-scroll');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.viewInitialized || !this.mobileMenu?.nativeElement) return;

    if (this.menuOpen && !this.mobileMenu.nativeElement.contains(event.target)) {
      this.menuOpen = false;
      this.menuStateChange.emit(false);

      if (this.document?.body) {
        this.renderer.removeClass(this.document.body, 'no-scroll');
      }
    }
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
  }

  ngOnDestroy() {
    if (this.document?.body) {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }
}
