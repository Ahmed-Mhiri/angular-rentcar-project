import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrl: './card-car.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class CardCarComponent implements OnInit {
  @Input() car: any; // <-- This is crucial!

  isMobileView = false;
  isExpanded = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.debugFuelType();
  }

  isElectricOrHybrid(): boolean {
    return this.car.fuelType === 'electric' || this.car.fuelType === 'hybrid';
  }

  debugFuelType(): void {
    console.log('Car:', this.car);
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
    this.isMobileView = window.innerWidth <= 768;
  }

  goToPurchasePage(car: any): void {
    this.router.navigate(['/purchase', car.id]);
  }
}
