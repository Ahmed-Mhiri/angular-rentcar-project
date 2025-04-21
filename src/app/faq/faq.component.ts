import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  faqs = [
    { 
      question: 'What is the age requirement to rent a vehicle?',
      answer: 'You must be at least 21 years old to rent a car or truck. A valid driver’s license and a major credit card are required.'
    },
    { 
      question: 'How do I reserve a vehicle?',
      answer: 'You can reserve a vehicle online through our website or by calling our customer service line.'
    },
    { 
      question: 'Can I rent a vehicle for a one-way trip?',
      answer: 'Yes, we offer one-way rentals, but additional fees may apply depending on the drop-off location.'
    },
    { 
      question: 'What is included in the rental price?',
      answer: 'The rental price includes basic insurance, 24/7 roadside assistance, and a standard mileage allowance. Additional options can be added at extra cost.'
    },
    { 
      question: 'Do I need insurance to rent a vehicle?',
      answer: 'While insurance is included, you may opt for additional coverage such as Collision Damage Waiver (CDW) for an extra fee.'
    },
    { 
      question: 'Can I rent a vehicle with a debit card?',
      answer: 'No, we require a major credit card to rent a vehicle. Debit cards are not accepted.'
    },
    { 
      question: 'What should I do if I get into an accident?',
      answer: 'In case of an accident, immediately contact us and the local authorities. Your rental agreement includes 24/7 roadside assistance, which will guide you through the process.'
    },
    { 
      question: 'Is there a mileage limit on rentals?',
      answer: 'Most rentals come with unlimited mileage, but certain vehicles or rental periods may have a mileage limit. Be sure to check the terms before booking.'
    },
    { 
      question: 'Can I rent a truck for moving purposes?',
      answer: 'Yes, we offer a variety of trucks for moving purposes. Just make sure to select the appropriate truck type for your needs.'
    },
    { 
      question: 'What is the fuel policy?',
      answer: 'We offer a full-to-full fuel policy, meaning you’ll need to return the vehicle with the same level of fuel as when you picked it up.'
    },
    { 
      question: 'How do I extend my rental?',
      answer: 'You can extend your rental by contacting us at least 24 hours before your scheduled return time.'
    }
  ];
  helpTopics = [
    { 
      title: 'Booking a Rental Vehicle',
      content: 'You can book a vehicle directly from our website. Choose your vehicle type, pick-up, and drop-off locations, and specify your rental duration. If you have special requests, contact us before booking.'
    },
    { 
      title: 'Payment Options',
      content: 'We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. You can pay in advance during the booking process or pay at the time of pick-up.'
    },
    { 
      title: 'Canceling or Modifying a Reservation',
      content: 'If you need to modify or cancel your reservation, visit your booking page or call customer service at least 24 hours before pick-up. A fee may apply for cancellations made less than 24 hours in advance.'
    },
    { 
      title: 'Insurance and Protection',
      content: 'Our rental rates include basic insurance, but you can opt for additional coverage like Collision Damage Waiver (CDW) or Theft Protection (TP) for extra peace of mind.'
    },
    { 
      title: 'Returning Your Rental Vehicle',
      content: 'Return your vehicle to the designated location and ensure it is refueled to the level it was at when you picked it up. A drop-off fee may apply if you return it at a different location.'
    },
    { 
      title: 'Driver Requirements',
      content: 'All drivers must have a valid driver’s license and be at least 21 years old (25 for larger vehicles). Additional drivers must be registered at the time of booking and meet the same criteria.'
    },
    { 
      title: 'Late Returns and Fees',
      content: 'If you return your vehicle late, additional charges may apply. If you know you will be late, contact us as soon as possible to make arrangements.'
    },
    { 
      title: 'What Happens if I Lose My Rental Vehicle?',
      content: 'If you lose your rental vehicle or keys, contact us immediately. We may charge a fee for lost keys or vehicles that are not returned on time.'
    },
    { 
      title: 'Special Offers and Discounts',
      content: 'Check our website regularly for special offers and seasonal discounts. We also offer discounts for long-term rentals and repeat customers.'
    },
    { 
      title: 'Accessibility Features',
      content: 'We offer vehicles equipped with accessibility features, such as ramps and hand controls. Please contact us in advance to ensure availability.'
    },
    { 
      title: 'Fueling Options',
      content: 'You can choose between different fueling options during the booking process. We offer the "full-to-full" option, or you can prepay for fuel if you prefer not to stop at the gas station.'
    }
  ];
  

  // Toggle between FAQ and Help
  currentTab: string = 'faq';  // Default to 'faq' tab

  switchTab(tab: string) {
    this.currentTab = tab;
  }
}


