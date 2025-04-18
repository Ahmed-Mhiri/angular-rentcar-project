import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-package-card',
  templateUrl: './car-package-card.component.html',
  styleUrls: ['./car-package-card.component.css'],
  imports: [CommonModule],
})
export class CarPackageCardComponent implements OnInit {
  @Input() bookingDetails!: { pickup: string; return: string };
  @Output() packageSelected = new EventEmitter<{ packageName: string; totalPrice: number }>();

  isSmallScreen = false;
  selectedPackage = 'standard'; // Preselected

  showDetails: { [key: string]: boolean } = {
    standard: false,
    comfort: false,
    comfortPlus: false
  };

  readonly dailyRates = {
    comfort: 30,
    comfortPlus: 40
  };

  ngOnInit(): void {
    this.isSmallScreen = window.innerWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isSmallScreen = window.innerWidth < 768;
  }

  toggleDetails(packageKey: string): void {
    this.showDetails[packageKey] = !this.showDetails[packageKey];
  }

  getNumberOfDays(): number {
    const pickup = new Date(this.bookingDetails.pickup);
    const dropoff = new Date(this.bookingDetails.return);
    const diff = (dropoff.getTime() - pickup.getTime()) / (1000 * 3600 * 24);
    return Math.max(Math.ceil(diff), 1); // At least 1 day
  }

  getTotalPrice(packageName: 'comfort' | 'comfortPlus'): number {
    return this.dailyRates[packageName] * this.getNumberOfDays();
  }

  selectPackage(packageName: 'comfort' | 'comfortPlus'): void {
    this.selectedPackage = packageName;
    const total = this.getTotalPrice(packageName);
    this.packageSelected.emit({ packageName, totalPrice: total });
  }
}
