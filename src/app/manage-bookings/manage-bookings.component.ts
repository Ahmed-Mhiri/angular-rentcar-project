import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.css'
})
export class ManageBookingsComponent {
  email: string = '';
  bookingCode: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // Handle form submission
  manageBooking() {
    if (!this.email || !this.bookingCode) {
      this.errorMessage = 'Please enter both email and booking code.';
      this.successMessage = '';
    } else {
      // Simulate managing the booking (e.g., fetching booking details)
      this.successMessage = 'Booking details fetched successfully!';
      this.errorMessage = '';
      // Here, you would add the logic to manage the booking, e.g., API call
    }
  }

}
