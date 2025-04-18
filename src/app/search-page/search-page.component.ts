import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainSectionComponent } from "../main-section/main-section.component";
import { CardCarComponent } from "../card-car/card-car.component";
import truckdata from '../../assets/trucks.json'; // Assuming truck data is stored in a JSON file
import cardata from '../../assets/cars.json';
import { FormsModule } from '@angular/forms';
import { CardTruckComponent } from "../card-truck/card-truck.component";
import { Router } from '@angular/router'; // Import in your constructor


export class Car {
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

export class Truck {
  constructor(
    public id: number,
    public model: string,
    public vanType: string,
    public engineType: string,
    public maxWeight: number,  // Max weight of the truck
    public curbWeight: number, // Curb weight of the truck
    public transmission: string,
    public loadCapacity: number,
    public rating: number,
    public gpsAvailable: boolean,
    public bluetoothAvailable: boolean,
    public pricePerDay: number,
    public image: string,
    public driverAgeLimit?: number,
    public license_required?: string,
    public rentalDays?: number,
    public totalPrice?: number,

  ) {}
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, MainSectionComponent, CardCarComponent, FormsModule, CardTruckComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  // Filter properties
  transmissionFilter: string = ''; // Transmission filter
  vanTypeFilter: string = 'all';
  maxWeightFilter: string = ''; // Max weight filter
  vehicleType: string = 'car'; // Default to car
  sortOption: string = '';
  fuelTypeFilter: string = 'all';
  gearFilter: string = '';
  passengerFilter: string = '';
  ageFilter: string = '';
  engineTypeFilter: string = 'all';
  weightFilter: string = '';
  loadCapacityFilter: string = '';
  isFilterOpen: boolean = false;

  cars: Car[] = [];
  trucks: Truck[] = [];
  filteredCars: Car[] = [];
  filteredTrucks: Truck[] = [];
  showMainSection: boolean = false;

  bookingDetails: any = {
    vehicle: 'Not specified',
    pickup: 'Not specified',
    return: 'Not specified',
    pickupDateTime: 'Not specified',
    returnDateTime: 'Not specified'
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      
      console.log('Query Params:', params);

      // Check if the vehicle query parameter exists
      if (params['vehicle']) {
        // Set the vehicle in bookingDetails from the URL
        this.bookingDetails.vehicle = params['vehicle'];
      }

      // Log the vehicle to check if it's correctly set
      console.log('Booking Details Vehicle:', this.bookingDetails.vehicle);

      // Explicitly set the vehicleType based on bookingDetails.vehicle
      if (this.bookingDetails.vehicle.toLowerCase() === 'truck') {
        this.vehicleType = 'truck'; // Set to 'truck' if vehicle is truck
      } else {
        this.vehicleType = 'car'; // Set to 'car' if vehicle is car
      }

      // Log vehicleType to check if it's correctly set
      console.log('Vehicle Type:', this.vehicleType);

      // Set other booking details if they exist in query params
      this.bookingDetails = {
        vehicle: this.bookingDetails.vehicle,
        pickup: params['pickup'] || 'Not specified',
        return: params['return'] || 'Not specified',
        pickupDateTime: params['pickupDateTime'] || 'Not specified',
        returnDateTime: params['returnDateTime'] || 'Not specified'
      };
     

      // Loading Cars Data
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

      // Loading Trucks Data
      this.trucks = truckdata.map(item => {
        // Convert weight strings like "3500 kg" to numbers
        const maxWeight = this.parseWeight(item.max_weight);
        const curbWeight = this.parseWeight(item.curb_weight);
        const loadCapacity = this.parseLoadCapacity(item.load_capacity);

        // Base price logic depending on the type of truck
        let basePrice = 50;  // Default base price for a truck per day

        // Increase price for Diesel engines
        if (item.engine_type.toLowerCase() === 'diesel') {
          basePrice += 20; // Diesel trucks are more expensive
        }

        // Increase price for larger load capacity
        if (loadCapacity >= 2) {
          basePrice += 30; // Trucks with larger load capacities (2 Euro pallets) are more expensive
        }

        // Increase price for automatic transmission
        if (item.transmission.toLowerCase() === 'automatic') {
          basePrice += 10; // Automatic transmission adds to the price
        }

        // Assign a random price within a range around the base price to add some variability
        const pricePerDay = Math.floor(Math.random() * (basePrice + 40 - basePrice) + basePrice);

        // Base rating logic as before
        let baseRating = 3;  // Start with a minimum rating of 3
        if (item.engine_type.toLowerCase() === 'diesel') baseRating += 0.5;
        if (item.transmission.toLowerCase() === 'automatic') baseRating += 0.5;
        if (loadCapacity >= 2) baseRating += 0.5;
        baseRating = Math.min(baseRating, 5);  // Ensure the rating stays between 3 and 5
        const randomRating = (Math.random() * (5 - baseRating) + baseRating).toFixed(1);

        const truck = new Truck(
          item.id,
          item.model,
          item.van_type,  // Assuming 'van_type' represents the truck type
          item.engine_type, // engine_type will map directly to engineType
          maxWeight,  // Using max weight as the weight
          curbWeight, // Using curb weight
          item.transmission,
          loadCapacity,  // load_capacity will map directly
          parseFloat(randomRating),  // Use the random rating generated
          true,  // Assuming GPS is available
          true,  // Assuming Bluetooth is available
          pricePerDay, // Use the generated price per day
          'assets/truck-images/' + item.image,
          Number(item.min_driver_age),
          item.license_required
        );

        const rentalDays = this.calculateRentalDays(this.bookingDetails.pickupDateTime, this.bookingDetails.returnDateTime);
        truck.rentalDays = rentalDays;
        truck.totalPrice = rentalDays * truck.pricePerDay;

        return truck;
      });

      this.applyFilters();
    });
  }

  parseWeight(weight: string): number {
    if (weight) {
      const weightValue = parseFloat(weight.replace(/[^\d.-]/g, '')); // Remove non-numeric characters
      return isNaN(weightValue) ? 0 : weightValue;
    }
    return 0;
  }

  parseLoadCapacity(loadCapacity: string): number {
    if (loadCapacity) {
      const loadValue = parseFloat(loadCapacity.replace(/[^\d.-]/g, '')); // Remove non-numeric characters
      return isNaN(loadValue) ? 0 : loadValue;
    }
    return 0;
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilters() {
    if (this.vehicleType === 'car') {
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
  
      // Sorting for cars
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
  
    } else if (this.vehicleType === 'truck') {
      // Convert maxWeightFilter to a number
      const maxWeightFilterValue = this.maxWeightFilter ? +this.maxWeightFilter : null;
  
      this.filteredTrucks = this.trucks.filter(truck => {
        let isMatch = true;
  
        // Transmission filter
        if (this.transmissionFilter && this.transmissionFilter !== '') {
          isMatch = isMatch && truck.transmission.toLowerCase() === this.transmissionFilter.toLowerCase();
        }
  
        // Truck Type filter
        // Van Type filter
        if (this.vanTypeFilter && this.vanTypeFilter !== 'all') {
          isMatch = isMatch && truck.vanType.toLowerCase() === this.vanTypeFilter.toLowerCase();
        }

  
        // Engine Type filter (diesel/electric)
        if (this.engineTypeFilter && this.engineTypeFilter !== 'all') {
          isMatch = isMatch && truck.engineType.toLowerCase() === this.engineTypeFilter.toLowerCase();
        }
  
        // Max weight filter: Ensure the truck's max weight is greater than the selected filter
        if (maxWeightFilterValue) {
          // Only include trucks whose maxWeight is greater than the selected filter
          isMatch = isMatch && truck.maxWeight >= maxWeightFilterValue;
        }
  
        // Load capacity filter
        if (this.loadCapacityFilter) {
          isMatch = isMatch && truck.loadCapacity >= +this.loadCapacityFilter;
        }
  
        return isMatch;
      });
  
      switch (this.sortOption) {
        case 'lowToHigh':
          this.filteredTrucks.sort((a, b) => a.pricePerDay - b.pricePerDay);
          break;
        case 'highToLow':
          this.filteredTrucks.sort((a, b) => b.pricePerDay - a.pricePerDay);
          break;
        case 'electricFirst':
          this.filteredTrucks.sort((a, b) => {
            const aIsElectric = a.engineType.toLowerCase() === 'electric' ? 1 : 0;
            const bIsElectric = b.engineType.toLowerCase() === 'electric' ? 1 : 0;
            return bIsElectric - aIsElectric;
          });
          break;
      }
    }
  }
  
  

  private calculateRentalDays(pickupDateTime: string, returnDateTime: string): number {
    if (pickupDateTime && returnDateTime) {
      const pickupDate = new Date(pickupDateTime);
      const returnDate = new Date(returnDateTime);
      const timeDiff = returnDate.getTime() - pickupDate.getTime();
      return Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // Ensure at least 1 day of rental
    }
    return 1; // Default to 1 day if dates are not provided
  }

  closeMainSection() {
    this.showMainSection = false;
  }
  goToPurchase(selectedVehicle: Car | Truck) {
    this.router.navigate(['/purchase'], {
      state: {
        bookingDetails: this.bookingDetails,
        selectedVehicle: selectedVehicle
      }
    });
}
}