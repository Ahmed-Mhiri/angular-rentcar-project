import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-package-card',
  standalone: true,
  templateUrl: './car-package-card.component.html',
  styleUrls: ['./car-package-card.component.css'],
  imports: [CommonModule],
})
export class CarPackageCardComponent implements OnInit {
  @Input() bookingDetails?: { pickupDateTime: string; returnDateTime: string };
  @Output() packageSelected = new EventEmitter<{ packageName: string; totalPrice: number }>();

  isSmallScreen = false;
  selectedPackage = 'standard';

  showDetails: { [key: string]: boolean } = {};

  readonly packages = [
    { key: 'standard', label: 'Standard', rate: 0 },
    { key: 'comfort', label: 'Comfort', rate: 30 },
    { key: 'comfortPlus', label: 'Comfort Plus', rate: 40 }
  ];

  ngOnInit(): void {
    this.isSmallScreen = window.innerWidth < 768;
    console.log('Booking details received in CarPackageCardComponent:', this.bookingDetails);

    // Initialize detail visibility map for all packages
    for (const pkg of this.packages) {
      this.showDetails[pkg.key] = false;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isSmallScreen = window.innerWidth < 768;
  }

  toggleDetails(packageKey: string): void {
    this.showDetails[packageKey] = !this.showDetails[packageKey];
  }

  getNumberOfDays(): number {
    if (!this.bookingDetails || !this.bookingDetails.pickupDateTime || !this.bookingDetails.returnDateTime) {
      console.warn('Invalid booking details: ', this.bookingDetails);
      return 1;
    }

    const pickupDate = new Date(this.bookingDetails.pickupDateTime);
    const dropoffDate = new Date(this.bookingDetails.returnDateTime);

    // Check if the dates are valid
    if (isNaN(pickupDate.getTime()) || isNaN(dropoffDate.getTime())) {
      console.warn('Invalid date(s) in booking details.');
      return 1;
    }

    const diff = (dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 3600 * 24);
    return Math.max(Math.ceil(diff), 1); // Ensure at least 1 day
  }

  getTotalPrice(packageKey: string): number {
    const pkg = this.packages.find(p => p.key === packageKey);
    if (!pkg) {
      console.warn('Package not found: ', packageKey);
      return 0;
    }

    const days = this.getNumberOfDays();
    const total = pkg.rate * days;
    console.log(`Total price for ${packageKey}: $${total} (${days} days)`);

    return total;
  }

  selectPackage(packageName: string): void {
    this.selectedPackage = packageName;
    const total = this.getTotalPrice(packageName);
    // Emit the selected package name and total price to the parent
    this.packageSelected.emit({ packageName, totalPrice: total });
  }
}
