import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-truck',
  imports: [CommonModule],
  templateUrl: './card-truck.component.html',
  styleUrl: './card-truck.component.css'
})
export class CardTruckComponent {
  @Input() truck: any; // <-- This is crucial!

  isMobileView = false;
  isExpanded = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.debugTruckDetails();
  }

  isDieselOrElectric(): boolean {
    return this.truck.engineType === 'diesel' || this.truck.engineType === 'electric';
  }

  debugTruckDetails(): void {
    console.log('Truck:', this.truck);
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
    this.isMobileView = window.innerWidth <= 768;
  }

  goToPurchasePage(truck: any): void {
    this.router.navigate(['/purchase', truck.id]);
  }

}
