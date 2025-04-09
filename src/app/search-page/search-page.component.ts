import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainSectionComponent } from "../main-section/main-section.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, MainSectionComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  showMainSection:boolean = false;
  bookingDetails: any = {
    vehicle: 'Not specified',
    pickup: 'Not specified',
    return: 'Not specified',
    pickupDateTime: 'Not specified',
    returnDateTime: 'Not specified'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the query parameters
    this.route.queryParams.subscribe(params => {
      this.bookingDetails = {
        vehicle: params['vehicle'],
        pickup: params['pickup'],
        return: params['return'],
        pickupDateTime: params['pickupDateTime'],
        returnDateTime: params['returnDateTime']
      };
    });
  }
  closeMainSection() {
    this.showMainSection = false;
  }

}
