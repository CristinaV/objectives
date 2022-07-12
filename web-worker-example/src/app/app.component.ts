import { Component } from '@angular/core';
import {PrimeCalculator} from "./app.prime";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web worker example';
  prime10: number = 0;
  prime10000: number = 0;

  find10thPrimeNumber() {
    this.prime10 = PrimeCalculator.findNthPrimeNumber(10);
  }

  find10000thPrimeNumber() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.prime10000 = data;
      };
      worker.postMessage(50000);
    }
  }
}
