import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StopwatchComponent } from './stopwatch';
import { SolveHistoryComponent } from './solve/history';
import { ScrambleComponent } from "./scramble";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StopwatchComponent, SolveHistoryComponent, ScrambleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rubics-cube-timer');
}
