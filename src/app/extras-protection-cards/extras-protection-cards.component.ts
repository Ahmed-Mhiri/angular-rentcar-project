import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ExtraOption {
  key: string;
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  currency?: string;
  countable?: boolean;
  max?: number;
  requiresReadMore?: boolean;
  group?: string;
  imageSrc?: string;
}

@Component({
  selector: 'app-extras-protection-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extras-protection-cards.component.html',
  styleUrls: ['./extras-protection-cards.component.css']
})
export class ExtrasProtectionCardsComponent {
  extrasList: ExtraOption[] = [
    {
      key: 'crossBorder',
      title: 'Cross Border Fee',
      description: 'This option allows you to drive your rental car to selected countries.',
      longDescription: 'See Terms and Conditions for specific cross-border agreements.',
      price: 37.47,
      currency: '€',
      requiresReadMore: true
    },
    {
      key: 'additionalDriver',
      title: 'Additional Driver',
      description: 'You can share the driving on long journeys.',
      longDescription: 'Enjoy the peace of mind that someone else can take the wheel when needed.',
      price: 99.79,
      currency: '€',
      countable: true,
      max: 3,
      requiresReadMore: true
    },
    {
      key: 'diesel',
      title: 'Diesel Guaranteed',
      description: 'Only available on EDMR, CDMR, EVMR, IVMR and SDMR.',
      price: 101.13,
      currency: '€'
    },
    {
      key: 'youngDriver',
      title: 'Young Driver Surcharge',
      description: 'Required for all drivers under 23.',
      longDescription: 'If you remove this charge from your extras, no additional fee will apply.',
      price: 74.32,
      currency: '€',
      requiresReadMore: true
    },
    {
      key: 'navigation',
      title: 'Navigational System',
      description: 'Stay on the right track and book a Sat Nav.',
      price: 101.13,
      currency: '€'
    },
    {
      key: 'toddlerSeat',
      title: 'Toddler Safety Seat 9-18kg (1-3 years)',
      description: 'Recommended for a child 1–3 years or 9–18kg.',
      price: 87.43,
      currency: '€',
      countable: true,
      max: 3,
      group: 'childSeats'
    },
    {
      key: 'childSeat',
      title: 'Child Safety Seat 15-30kg (4–7 years)',
      description: 'Recommended for a child 4–7 years or 15–30kg.',
      price: 87.43,
      currency: '€',
      countable: true,
      max: 3,
      group: 'childSeats'
    },
    {
      key: 'babySeat',
      title: 'Baby Safety Seat 0-13kg (0–12 months)',
      description: 'Recommended for a child 0–12 months or 0–13kg.',
      price: 87.43,
      currency: '€',
      countable: true,
      max: 3,
      group: 'childSeats'
    },
    {
      key: 'trailer',
      title: 'Trailer Hitch',
      description: 'Attach a trailer or bike rack with ease using a sturdy and reliable hitch.',
      price: 87.43,
      currency: '€'
    }
  ];

  // Initialize extrasState to prevent undefined errors
  extrasState: Record<string, { selected: boolean; count: number }> = {};

  readMore: Record<string, boolean> = {};

  constructor() {
    // Initialize `extrasState` for each `extra.key` to avoid undefined access
    this.extrasList.forEach(extra => {
      if (!this.extrasState[extra.key]) {
        this.extrasState[extra.key] = { selected: false, count: 0 };
      }
      this.readMore[extra.key] = false;  // Make sure readMore is also initialized
    });
    this.extrasList = this.extrasList.map(extra => ({
      ...extra,
      imageSrc: `assets/adds-images/${extra.key}.jpg`
    }));
  }

  toggleRead(key: string): void {
    this.readMore[key] = !this.readMore[key];
  }

  addExtra(key: string, max: number = Infinity, group?: string): void {
    if (this.extrasState[key].count >= max) return;

    if (group) {
      const groupTotal = this.getGroupTotal(group);
      if (groupTotal >= 3) return;
    }

    this.extrasState[key].count++;
    this.extrasState[key].selected = true;
  }

  getGroupTotal(group: string): number {
    return this.extrasList
      .filter(e => e.group === group)
      .reduce((total, e) => total + (this.extrasState[e.key]?.count || 0), 0);
  }

  removeExtra(key: string): void {
    if (this.extrasState[key].count > 0) {
      this.extrasState[key].count--;
    }
    if (this.extrasState[key].count === 0) {
      this.extrasState[key].selected = false;
    }
  }

  toggleExtra(key: string): void {
    const state = this.extrasState[key];
    state.selected = !state.selected;
    state.count = state.selected ? 1 : 0;
  }
}
