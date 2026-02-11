import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Stopwatch } from './stopwatch/stopwatch';
import { Scramble } from "./scramble/scramble";
import { SolvingList } from "./solving/solving-list/solving-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Stopwatch, Scramble, SolvingList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rubics-cube-timer');

  startTimer() {
    console.log('start');
  }
}
