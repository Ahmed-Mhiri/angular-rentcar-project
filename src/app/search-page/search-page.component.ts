import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainSectionComponent } from "../main-section/main-section.component";
import { CardCarComponent } from "../card-car/card-car.component";
import cardata from '../../assets/cars.json';

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
  imports: [CommonModule, MainSectionComponent, CardCarComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  cars: Car[] = [];
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

      const rentalDays = this.calculateRentalDays(this.bookingDetails.pickupDateTime, this.bookingDetails.returnDateTime);

      this.cars = cardata.map(item => {
        const car = new Car(
          item.id,
          item.model,
          item.type,
          item.fuel_type, // Mapping from fuel_type in JSON
          item.range_km,  // Mapping from range_km in JSON
          item.seats,
          item.doors,
          item.luggage_capacity,
          item.transmission,
          item.rating,
          item.gps,
          item.bluetooth,
          item.age_limit,
          item.Price_per_day, // Mapping from Price_per_day in JSON
          'assets/car-images/' + item.src // Assuming the images are stored locally
        );

        // Calculate rentalDays and totalPrice based on the booking dates
        car.rentalDays = rentalDays;
        car.totalPrice = rentalDays * car.pricePerDay;

        return car;
      });
    });
  }

  // Function to calculate rental days
  private calculateRentalDays(pickupDateTime: string, returnDateTime: string): number {
    if (pickupDateTime && returnDateTime) {
      const pickupDate = new Date(pickupDateTime);
      const returnDate = new Date(returnDateTime);
      const timeDiff = returnDate.getTime() - pickupDate.getTime();
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate rental days
    }
    return 0; // Return 0 if the dates are not valid or not specified
  }

  closeMainSection() {
    this.showMainSection = false;
  }
}
