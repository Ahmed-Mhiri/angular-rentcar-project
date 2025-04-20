import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckandpayComponent } from "./checkandpay/checkandpay.component";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [CommonModule, FormsModule, CheckandpayComponent],
})
export class PaymentComponent implements OnInit {
  detailsVisible = true; // Default to true for large screens
  isSmallScreen = false;
  selectedCountryCode: string = ''; 
  driver = {
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    country: 'Germany', 
    phoneNumber: ''
  };

  payment = {
    paymentMethod: '',
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: '',
    paypalEmail: '' // PayPal email
  };

  invoice = {
    country: 'United States',
    streetAddress: '',
    zip: '',
    city: '',
  };

  countries = [
    { name: 'United States', code: '+1' },
    { name: 'Germany', code: '+49' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Australia', code: '+61' },
    { name: 'Canada', code: '+1' },
    { name: 'France', code: '+33' },
    // Add more countries and their codes as needed
  ];

  bookingDetails: any;
  selectedVehicle: any;
  selectedExtras: any[] = [];
  selectedPackageName: string = '';
  selectedPackageTotal: number = 0;
  totalPrice: number = 0;
  extrasVisible = false;

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

      // Log to confirm data
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

  ngOnInit() {
    // Initial check on page load
    this.isSmallScreen = window.innerWidth <= 767;
    if (!this.isSmallScreen) {
      this.detailsVisible = true; // Set to true on large screens
    }
    this.onCountryChange();
  }

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

  get extrasTotal(): number {
    return this.selectedExtras.reduce((sum, e) => sum + e.totalPrice, 0);
  }

  // Toggle visibility of extras section
  toggleExtras() {
    this.extrasVisible = !this.extrasVisible;
  }

  // Handle form submission
  onSubmit(driverForm: NgForm) {
    // Mark all controls as touched to trigger validation messages
    this.markAllAsTouched(driverForm);
  
    // Check if form is valid
    if (driverForm.invalid) {
      console.log('Form is invalid');
      return; // Don't submit if the form is invalid
    }
  
    // Validate all required sections
    if (!this.validateDriverInfo() || !this.validatePaymentInfo() || !this.validateInvoiceAddress()) {
      return; // Stop submission if any validation fails
    }
  
    // Form submission logic goes here (if valid)
    console.log('Form submitted successfully');
    console.log('Driver Info:', this.driver);
    console.log('Invoice Info:', this.invoice);
    console.log('Payment Info:', this.payment);
    console.log('Total Price:', this.totalPrice);
  }
  
  private markAllAsTouched(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched(); // Mark each field as touched to trigger validation messages
    });
  }

  // Validate Driver Information
  validateDriverInfo(): boolean {
    if (!this.driver.firstName || !this.driver.lastName || !this.driver.email || !this.driver.phoneNumber) {
      alert('Please fill out all required driver information fields.');
      return false;
    }
    return true;
  }

  // Validate Payment Information
  validatePaymentInfo(): boolean {
    if (this.payment.paymentMethod === 'Credit Card' || this.payment.paymentMethod === 'Debit Card') {
      if (!this.payment.cardNumber || !this.payment.cardholderName || !this.payment.expirationDate || !this.payment.cvv) {
        alert('Please complete all card details.');
        return false;
      }
    } else if (this.payment.paymentMethod === 'PayPal') {
      if (!this.payment.paypalEmail || !this.validateEmail(this.payment.paypalEmail)) {
        alert('Please provide a valid PayPal email address.');
        return false;
      }
    }
    return true;
  }

  // Validate Invoice Address
  validateInvoiceAddress(): boolean {
    if (!this.invoice.country || !this.invoice.streetAddress || !this.invoice.zip || !this.invoice.city) {
      alert('Please complete the invoice address.');
      return false;
    }
    return true;
  }

  // Handle change in selected country and update country code
  onCountryChange(): void {
    const selectedCountry = this.countries.find(country => country.name === this.driver.country);
    if (selectedCountry) {
      this.selectedCountryCode = selectedCountry.code; // Update the country code
    } else {
      this.selectedCountryCode = ''; // Default to empty if no country is selected
    }
  }

  // Validate email format using regex
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Handle payment method change (clear fields when switching between PayPal and cards)
  onPaymentMethodChange() {
    if (this.payment.paymentMethod === 'PayPal') {
      this.payment.cardNumber = '';
      this.payment.cardholderName = '';
      this.payment.expirationDate = '';
      this.payment.cvv = '';
    } else {
      this.payment.paypalEmail = '';
    }
  }
}