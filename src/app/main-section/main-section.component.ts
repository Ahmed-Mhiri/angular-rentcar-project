import { Component, OnInit } from '@angular/core';
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
  isCarSelected = true;
  backgroundImageUrl: string = 'url("https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg")';
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

  constructor(private http: HttpClient,private router: Router) {}
  
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

  toggleVehicle(type: string): void {
    this.isCarSelected = type === 'car';
    
    this.backgroundImageUrl = this.isCarSelected 
        ? 'url("https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg")' 
        : 'url("https://images.pexels.com/photos/17157308/pexels-photo-17157308/free-photo-of-ford-maverick-on-desert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
}


  showCars() {
    this.router.navigate(['/search-page']); // Navigate first
    setTimeout(() => { // Show alert after navigation starts
      alert(`Booking details:
      Vehicle: ${this.isCarSelected ? 'Car' : 'Truck'}
      Pickup: ${this.pickupLocation}
      Return: ${this.returnLocation || 'Not specified'}
      Pickup Date/Time: ${this.pickupDate} ${this.pickupTime}
      Return Date/Time: ${this.returnDate} ${this.returnTime}`);
    }, 500);
  }
  
  
}
