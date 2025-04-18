import { Component } from '@angular/core';
import { CarPackageCardComponent } from "../car-package-card/car-package-card.component";
import { ExtrasProtectionCardsComponent } from "../extras-protection-cards/extras-protection-cards.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CarPackageCardComponent, ExtrasProtectionCardsComponent,CommonModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'] // <-- Corrected 'styleUrl' to 'styleUrls'
})
export class PurchaseComponent {
  bookingDetails: any;
  selectedVehicle: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as {
      bookingDetails: any;
      selectedVehicle: any;
    };

    console.log('Navigation state:', state); // ✅ DEBUG LOG

    if (state) {
      this.bookingDetails = state.bookingDetails;
      this.selectedVehicle = state.selectedVehicle;

      console.log('Booking Details:', this.bookingDetails); // ✅ DEBUG LOG
      console.log('Selected Vehicle:', this.selectedVehicle); // ✅ DEBUG LOG
    } else {
      console.warn('No navigation state found.'); // ⚠️ Optional warning
    }
  }
  selectedPackageName: string = '';
  selectedPackageTotal: number = 0;

  handlePackageSelection(event: { packageName: string; totalPrice: number }) {
    console.log('User selected:', event.packageName, 'Total:', event.totalPrice);
    // Save or send to backend if needed
  }
}

