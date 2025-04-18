import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Truck } from '../search-page/search-page.component';


@Component({
  selector: 'app-card-truck',
  imports: [CommonModule],
  templateUrl: './card-truck.component.html',
  styleUrl: './card-truck.component.css'
})
export class CardTruckComponent {
  @Input() truck!: Truck; // ✅ <-- This is what's missing
  @Output() bookTruck = new EventEmitter<Truck>();

  onBook() {
    this.bookTruck.emit(this.truck);
  }

  isMobileView = false;
  isExpanded = false;

  constructor(private router: Router) {}

  isDieselOrElectric(): boolean {
    return this.truck.engineType === 'diesel' || this.truck.engineType === 'electric';
  }


  toggleDetails() {
    this.isExpanded = !this.isExpanded;
    this.isMobileView = window.innerWidth <= 768;
  }


}
