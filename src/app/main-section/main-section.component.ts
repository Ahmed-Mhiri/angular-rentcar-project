import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule,RouterModule], // Added CommonModule here
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  pickupLocation = '';
  returnLocation = '';
  isPickupLocationValid: boolean = true;
  isReturnLocationValid: boolean = true;
  isPickupDateValid: boolean = true;
  isReturnDateValid: boolean = true;
  pickupTime = '12:30';
  returnTime = '08:30';
  minDate!: string;
  pickupDate!: string;
  returnDate!: string ;
  isDateValid: boolean = true;
  isCarSelected: boolean = true;
  backgroundImageUrl: string = 'url("https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg")';
  @Output() backgroundImageUrlChange = new EventEmitter<string>();
  @Output() isCarSelectedChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();



setDefaultDates() {
  const currentDate = new Date();
  
  // Format today's date as YYYY-MM-DD
  this.minDate = currentDate.toISOString().split('T')[0];

  // Set pickup date = today + 2 days
  const pickup = new Date();
  pickup.setDate(currentDate.getDate() + 2);
  this.pickupDate = pickup.toISOString().split('T')[0];

  // Set return date = today + 4 days
  const returnD = new Date();
  returnD.setDate(currentDate.getDate() + 4);
  this.returnDate = returnD.toISOString().split('T')[0];
}

// Update return date's min value when pickup date changes
updateReturnMinDate() {
  if (new Date(this.returnDate) < new Date(this.pickupDate)) {
    this.returnDate = this.pickupDate;
  }
}
validateDates() {
  const today = new Date().toISOString().split('T')[0];

  // Check if pickup date is valid
  this.isPickupDateValid = this.pickupDate >= today;

  // Check if return date is valid (must be after pickup date)
  this.isReturnDateValid = this.returnDate > this.pickupDate;

  // Overall date validation flag
  this.isDateValid = this.isPickupDateValid && this.isReturnDateValid;
}


  pickupSuggestions: string[] = [];
  returnSuggestions: string[] = [];
  filteredPickupSuggestions: string[] = [];
  filteredReturnSuggestions: string[] = [];

  isPickupFocused = false;
  isReturnFocused = false;

  private citiesWithAirports$!: Observable<any>;

  constructor(private http: HttpClient,private router: Router) { this.setDefaultDates();}
  
  ngOnInit() {
    this.citiesWithAirports$ = this.http.get<any>('assets/cities_with_airports.json');

    this.citiesWithAirports$.subscribe(data => {
      const citiesWithAirports = data.cities_with_airports;

      // Separate suggestions into city and city + airport
      this.pickupSuggestions = citiesWithAirports.flatMap((item: { city: string; airport: string }) => [
        item.city, // Add city as a separate entry
        `${item.city} - ${item.airport}` // Add city + airport as a separate entry
      ]);
      
      this.returnSuggestions = [...this.pickupSuggestions]; // Make return suggestions the same as pickup

      this.filteredPickupSuggestions = [...this.pickupSuggestions];
      this.filteredReturnSuggestions = [...this.returnSuggestions];
    });
  }

  filterLocations(field: string) {
    if (field === 'pickup') {
      this.filteredPickupSuggestions = this.pickupSuggestions.filter(location =>
        location.toLowerCase().startsWith(this.pickupLocation.toLowerCase())
      );
    } else if (field === 'return') {
      this.filteredReturnSuggestions = this.returnSuggestions.filter(location =>
        location.toLowerCase().startsWith(this.returnLocation.toLowerCase())
      );
    }
  }

  showLocationSuggestions(field: string) {
    if (field === 'pickup') {
      this.isPickupFocused = true;
    } else if (field === 'return') {
      this.isReturnFocused = true;
    }
  }

  selectLocation(location: string, field: string) {
    if (field === 'pickup') {
      this.pickupLocation = location;
      this.returnLocation = location; // Automatically set return location
      this.isPickupLocationValid = true;
      this.isReturnLocationValid = true;
    } else if (field === 'return') {
      this.returnLocation = location;
      this.isReturnLocationValid = true;
    }
    this.isPickupFocused = false;
    this.isReturnFocused = false;
  }
  validateLocation(field: string) {
    if (field === 'pickup') {
      this.isPickupLocationValid = this.filteredPickupSuggestions?.includes(this.pickupLocation) ?? false;
    } else if (field === 'return') {
      this.isReturnLocationValid = this.filteredReturnSuggestions?.includes(this.returnLocation) ?? false;
    }
  }
  

  toggleVehicle(type: string): void {
    this.isCarSelected = type === 'car';
    
    this.backgroundImageUrl = this.isCarSelected 
        ? 'url("https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg")' 
        : 'url("https://images.pexels.com/photos/17157308/pexels-photo-17157308/free-photo-of-ford-maverick-on-desert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
        this.backgroundImageUrlChange.emit(this.backgroundImageUrl);
        this.isCarSelectedChange.emit(this.isCarSelected);

}


showCars() {
  // Validate locations
  this.validateLocation('pickup');
  this.validateLocation('return');

  // Validate dates
  this.validateDates();

  // If any validation fails, stop navigation and show an alert
  if (!this.isPickupLocationValid || !this.isReturnLocationValid || !this.isPickupDateValid || !this.isReturnDateValid) {
    alert('Please enter valid pickup/return locations and ensure the dates are correct.');
    return; // Stop navigation
  }

  // Proceed with navigation only if everything is valid
  this.router.navigate(['/search-page'], {
    queryParams: {
      vehicle: this.isCarSelected ? 'Car' : 'Truck',
      pickup: this.pickupLocation,
      return: this.returnLocation || 'Not specified',
      pickupDateTime: `${this.pickupDate} ${this.pickupTime}`,
      returnDateTime: `${this.returnDate} ${this.returnTime}`
    }
  })
  this.close.emit();

  setTimeout(() => {
    alert(`Booking details:
    Vehicle: ${this.isCarSelected ? 'Car' : 'Truck'}
    Pickup: ${this.pickupLocation}
    Return: ${this.returnLocation || 'Not specified'}
    Pickup Date/Time: ${this.pickupDate} ${this.pickupTime}
    Return Date/Time: ${this.returnDate} ${this.returnTime}`);
  }, 500);
}



  
  
}
