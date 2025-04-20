import { CommonModule } from '@angular/common';
import { Component, HostListener,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  imports: [CommonModule],
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  detailsVisible = true; // Default to true for large screens
  isSmallScreen = false;

  // Listen for window resize event
  @HostListener('window:resize')
  onResize() {
    this.isSmallScreen = window.innerWidth <= 767;
    if (!this.isSmallScreen) {
      this.detailsVisible = true; // Always true on larger screens
    } else {
      this.detailsVisible = false; // Default false on small screens
    }
  }

  ngOnInit() {
    // Initial check on page load
    this.isSmallScreen = window.innerWidth <= 767;
    if (!this.isSmallScreen) {
      this.detailsVisible = true; // Set to true on large screens
    }
  }
  bookingDetails: any;
  selectedVehicle: any;
  selectedExtras: any[] = [];
  selectedPackageName: string = '';
  selectedPackageTotal: number = 0;
  totalPrice: number = 0;
  extrasVisible = false;

  toggleExtras() {
    this.extrasVisible = !this.extrasVisible;
  }

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    if (state) {
      this.bookingDetails = state['bookingDetails'];
      this.selectedVehicle = state['selectedVehicle'];
      this.selectedExtras = state['selectedExtras'] || [];
      this.selectedPackageName = state['selectedPackageName'];
      this.selectedPackageTotal = state['selectedPackageTotal'];
      this.totalPrice = state['totalPrice'];

      // ✅ Log to confirm data
      console.log('Received Booking Details:', this.bookingDetails);
      console.log('Received Vehicle:', this.selectedVehicle);
      console.log('Received Extras:', this.selectedExtras);
      console.log('Package Name:', this.selectedPackageName);
      console.log('Package Total:', this.selectedPackageTotal);
      console.log('Total Price:', this.totalPrice);
    } else {
      console.warn('⚠️ No state found in navigation!');
    }
  }
  get extrasTotal(): number {
    return this.selectedExtras.reduce((sum, e) => sum + e.totalPrice, 0);
  }
}