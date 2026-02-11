import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchStore } from '../stopwatch.store';
import { StopwatchState } from '../stopwatch.types';

@Component({
    selector: 'app-stopwatch-hints',
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./hints.html",
    styleUrls: ["./hints.css"]  
})
export class Hints {
    protected readonly store = inject(StopwatchStore);
    protected readonly state = StopwatchState;
}
