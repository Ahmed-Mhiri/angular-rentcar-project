import { Component } from '@angular/core';
import { CarPackageCardComponent } from "../car-package-card/car-package-card.component";
import { ExtrasProtectionCardsComponent } from "../extras-protection-cards/extras-protection-cards.component";

@Component({
  selector: 'app-purchase',
  imports: [CarPackageCardComponent, ExtrasProtectionCardsComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {

}
