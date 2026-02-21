import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SolveHistoryComponent, SolveHistoryService } from './solve/history';
import { ScrambleComponent, ScrambleStore } from "./scramble";
import { StopwatchService, StopwatchComponent } from './stopwatch';
import { SolveStatisticsComponent } from "./solve/statistics";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StopwatchComponent, SolveHistoryComponent, ScrambleComponent, SolveStatisticsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DNF');

  private readonly _stopwatchService = inject(StopwatchService);
  private readonly _scrambleStore = inject(ScrambleStore);
  private readonly _solveHistoryService = inject(SolveHistoryService);

  constructor() {
    this._stopwatchService.onFinish.subscribe(() => {
      const scramble = this._scrambleStore.currentScramble();
      const elapsedTime = this._stopwatchService.elapsedTime();
      const today = new Date();

      console.log(`Adding to solve history: 
        Scramble: ${scramble} 
        Elapsed time: ${elapsedTime}
        Date: ${today}`);

      this._solveHistoryService.addSolve({
        date: today,
        scramble: scramble,
        elapsedTime: elapsedTime,
      })

    });
  }

}
