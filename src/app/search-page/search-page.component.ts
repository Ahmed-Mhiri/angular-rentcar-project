import { Component, OnInit } from '@angular/core';
import { SearchbarSComponent } from "../searchbar-s/searchbar-s.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [SearchbarSComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
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
}
