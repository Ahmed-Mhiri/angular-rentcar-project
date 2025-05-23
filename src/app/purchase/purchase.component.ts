import { Component } from '@angular/core';
import { CarPackageCardComponent } from "../car-package-card/car-package-card.component";
import { ExtrasProtectionCardsComponent } from "../extras-protection-cards/extras-protection-cards.component";
import { Router } from '@angular/router';
import { CommonModule,Location } from '@angular/common';
interface SelectedExtra {
  key: string;
  title: string;
  price: number;
  count: number;
  totalPrice: number;
}

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
  selectedExtras: SelectedExtra[] = [];



  constructor(private router: Router,  private location: Location) {
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

  handlePackageSelection(event: { packageName: string, totalPrice: number }) {
    // Capture the selected package name and total price
    console.log('Package selected:', event.packageName, 'Total Price:', event.totalPrice);
    this.selectedPackageName = event.packageName;
    this.selectedPackageTotal = event.totalPrice;
  }
  handleSelectedExtras(extras: SelectedExtra[]): void {
    console.log('Selected extras received:', extras);
    this.selectedExtras = extras;
  }
  extrasTotal: number = 0;

  handleExtrasTotalChange(total: number) {
  console.log('Extras total received:', total);
  this.extrasTotal = total;
}
get totalPrice(): number {
  const vehiclePrice = this.selectedVehicle?.totalPrice || 0;
  return vehiclePrice + this.selectedPackageTotal + this.extrasTotal;
}

goBack() {
  this.location.back(); // Or navigate manually to a specific route
}

goToPayment() {
  this.router.navigate(['/payment'], {
    state: {
      bookingDetails: this.bookingDetails,
      selectedVehicle: this.selectedVehicle,
      selectedExtras: this.selectedExtras,
      selectedPackageName: this.selectedPackageName,
      selectedPackageTotal: this.selectedPackageTotal,
      totalPrice: this.totalPrice
    }
  });
}

}

