import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Ensure CommonModule is imported

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule], // Added CommonModule here
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  isCarSelected = true;
  pickupLocation = '';
  returnLocation = '';
  pickupDate = '2025-03-23';
  pickupTime = '12:30';
  returnDate = '2025-03-27';
  returnTime = '08:30';

  pickupSuggestions: string[] = [];
  returnSuggestions: string[] = [];
  filteredPickupSuggestions: string[] = [];
  filteredReturnSuggestions: string[] = [];

  isPickupFocused = false;
  isReturnFocused = false;

  private citiesWithAirports$!: Observable<any>;

  constructor(private http: HttpClient) {}

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
      this.returnLocation = location; // Automatically set the return location to the same as pickup
    } else if (field === 'return') {
      this.returnLocation = location;
    }
    this.isPickupFocused = false;
    this.isReturnFocused = false;
  }

  toggleVehicle(type: string) {
    this.isCarSelected = type === 'car';
  }

  showCars() {
    alert(`Booking details:
    Vehicle: ${this.isCarSelected ? 'Car' : 'Truck'}
    Pickup: ${this.pickupLocation}
    Return: ${this.returnLocation || 'Not specified'}
    Pickup Date/Time: ${this.pickupDate} ${this.pickupTime}
    Return Date/Time: ${this.returnDate} ${this.returnTime}`);
 
  }
  
}
