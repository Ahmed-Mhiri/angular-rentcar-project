import { Component } from '@angular/core';
import { MainSectionComponent } from "../main-section/main-section.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  imports: [MainSectionComponent,CommonModule,FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
backgroundImageUrl: string = 'url("https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg")';
isCarSelected: boolean = true;

}
