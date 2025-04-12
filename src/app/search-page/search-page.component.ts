import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainSectionComponent } from "../main-section/main-section.component";
import { CardCarComponent } from "../card-car/card-car.component";
import cardata from '../../assets/cars.json';
import { FormsModule } from '@angular/forms';

class Car {
  constructor(
    public id: number,
    public model: string,
    public type: string,
    public fuelType: string,
    public rangeKm: number,
    public seats: number,
    public doors: number,
    public luggageCapacity: number,
    public transmission: string,
    public rating: number,
    public gps: boolean,
    public bluetooth: boolean,
    public ageLimit: number,
    public pricePerDay: number,
    public image: string,
    public rentalDays?: number,
    public totalPrice?: number
  ) {}
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, MainSectionComponent, CardCarComponent, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  sortOption: string = '';
  fuelTypeFilter: string = 'all';
  gearFilter: string = '';
  passengerFilter: string = '';
  ageFilter: string = '';
  isFilterOpen: boolean = false;

  cars: Car[] = [];
  filteredCars: Car[] = [];
  showMainSection: boolean = false;

  bookingDetails: any = {
    vehicle: 'Not specified',
    pickup: 'Not specified',
    return: 'Not specified',
    pickupDateTime: 'Not specified',
    returnDateTime: 'Not specified'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.bookingDetails = {
        vehicle: params['vehicle'],
        pickup: params['pickup'],
        return: params['return'],
        pickupDateTime: params['pickupDateTime'],
        returnDateTime: params['returnDateTime']
      };

      this.cars = cardata.map(item => {
        const car = new Car(
          item.id,
          item.model,
          item.type,
          item.fuel_type,
          item.range_km,
          item.seats,
          item.doors,
          item.luggage_capacity,
          item.transmission,
          item.rating,
          item.gps,
          item.bluetooth,
          item.age_limit,
          item.Price_per_day,
          'assets/car-images/' + item.src
        );

        const rentalDays = this.calculateRentalDays(this.bookingDetails.pickupDateTime, this.bookingDetails.returnDateTime);
        car.rentalDays = rentalDays;
        car.totalPrice = rentalDays * car.pricePerDay;

        return car;
      });

      this.applyFilters();
    });
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      let isMatch = true;

      // Fuel type filter
      if (this.fuelTypeFilter && this.fuelTypeFilter !== 'all') {
        const fuel = car.fuelType.toLowerCase();
        if (this.fuelTypeFilter === 'non-electric') {
          isMatch = isMatch && fuel !== 'electric';
        } else {
          isMatch = isMatch && fuel === this.fuelTypeFilter;
        }
      }

      // Gear filter
      if (this.gearFilter) {
        isMatch = isMatch && car.transmission.toLowerCase() === this.gearFilter.toLowerCase();
      }

      // Passengers filter
      if (this.passengerFilter) {
        isMatch = isMatch && car.seats >= +this.passengerFilter;
      }

      // Age filter
      if (this.ageFilter) {
        isMatch = isMatch && car.ageLimit <= +this.ageFilter;
      }

      return isMatch;
    });

    // Sorting
    switch (this.sortOption) {
      case 'lowToHigh':
        this.filteredCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'highToLow':
        this.filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'electricFirst':
        this.filteredCars.sort((a, b) =>
          (b.fuelType.toLowerCase() === 'electric' ? 1 : 0) - (a.fuelType.toLowerCase() === 'electric' ? 1 : 0)
        );
        break;
    }
  }

  private calculateRentalDays(pickupDateTime: string, returnDateTime: string): number {
    if (pickupDateTime && returnDateTime) {
      const pickupDate = new Date(pickupDateTime);
      const returnDate = new Date(returnDateTime);
      const timeDiff = returnDate.getTime() - pickupDate.getTime();
      return Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // at least 1 day
    }
    return 1;
  }

  closeMainSection() {
    this.showMainSection = false;
  }
}
