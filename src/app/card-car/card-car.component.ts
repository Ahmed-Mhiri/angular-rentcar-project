import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../search-page/search-page.component';

@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrl: './card-car.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class CardCarComponent {
  @Input() car!: Car;
  @Output() bookCar = new EventEmitter<Car>();

  onBook() {
    this.bookCar.emit(this.car);
  }

  isMobileView = false;
  isExpanded = false;

  constructor(private router: Router) {}


  isElectricOrHybrid(): boolean {
    return this.car.fuelType === 'electric' || this.car.fuelType === 'hybrid';
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
    this.isMobileView = window.innerWidth <= 768;
  }

  goToPurchasePage(car: any): void {
    this.router.navigate(['/purchase', car.id]);
  }
}
