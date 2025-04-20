import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkandpay',
  templateUrl: './checkandpay.component.html',
  styleUrls: ['./checkandpay.component.css'],
  imports:[FormsModule,CommonModule]
})
export class CheckandpayComponent implements OnInit {
  driver = {
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phoneNumber: ''
  };

  invoice = {
    country: '',
    streetAddress: '',
    zip: '',
    city: ''
  };

  payment = {
    paymentMethod: '',
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: '',
    paypalEmail: ''
  };

  countries = [
    { name: 'United States', code: '+1' },
    { name: 'Germany', code: '+49' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Canada', code: '+1' }
    // Add more countries as needed
  ];

  selectedCountryCode = '';

  @Input() totalPrice: number = 0;

  onCountryChange() {
    const selected = this.countries.find(c => c.name === this.driver.country);
    this.selectedCountryCode = selected ? selected.code : '';
  }

  onPaymentMethodChange() {
    // Optionally reset fields when switching payment method
    if (this.payment.paymentMethod !== 'PayPal') {
      this.payment.paypalEmail = '';
    } else {
      this.payment.cardNumber = '';
      this.payment.cardholderName = '';
      this.payment.expirationDate = '';
      this.payment.cvv = '';
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Submitted Data:', {
        driver: this.driver,
        invoice: this.invoice,
        payment: this.payment
      });
      alert('Form submitted successfully!');
      form.resetForm();
    } else {
      alert('Please complete the required fields.');
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
