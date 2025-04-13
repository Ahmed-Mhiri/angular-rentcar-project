import { CommonModule } from '@angular/common';
import { Component, Input,HostListener  } from '@angular/core';

@Component({
  selector: 'app-car-package-card',
  templateUrl: './car-package-card.component.html',
  styleUrls: ['./car-package-card.component.css'],
  imports: [CommonModule],
})
export class CarPackageCardComponent{ // This will track if details should be shown
  showDetails: { [key: string]: boolean } = {
    standard: false,
    comfort: false,
    comfortPlus: false
  };

  // This will track if the screen size is small (for responsive behavior)
  isSmallScreen: boolean = false;

  // On resize event, check if screen width is small
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth < 768; // Adjust to your breakpoint
  }

  // Method to toggle the visibility of the details for a specific package
  toggleDetails(packageKey: string): void {
    // Toggle the visibility for the specific package
    this.showDetails[packageKey] = !this.showDetails[packageKey];
  }

  // Check initial screen size on component load
  ngOnInit(): void {
    this.isSmallScreen = window.innerWidth < 768;
  }
  
}

