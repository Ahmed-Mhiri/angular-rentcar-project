import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Section = 'roadside' | 'additionalDriver';

@Component({
  selector: 'app-extras-protection-cards',
  standalone: true, // Assuming it's a standalone component
  imports: [CommonModule],
  templateUrl: './extras-protection-cards.component.html',
  styleUrl: './extras-protection-cards.component.css'
})
export class ExtrasProtectionCardsComponent {

  driverCount = 0;
  maxDrivers = 3;

  readMore: Record<Section, boolean> = {
    roadside: false,
    additionalDriver: false
  };

  // Track selection status
  selectedExtras: Record<Section, boolean> = {
    roadside: false,
    additionalDriver: false
  };

  toggleRead(section: Section): void {
    this.readMore[section] = !this.readMore[section];
  }

  toggleRoadside(): void {
    this.selectedExtras.roadside = !this.selectedExtras.roadside;
  }

  addDriver(): void {
    if (this.driverCount < this.maxDrivers) {
      this.driverCount++;
      this.selectedExtras.additionalDriver = true;
    }
  }

  removeDriver(): void {
    if (this.driverCount > 0) {
      this.driverCount--;
    }

    if (this.driverCount === 0) {
      this.selectedExtras.additionalDriver = false;
    }
  }

}
