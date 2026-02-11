import { Component, inject } from '@angular/core';
import { TimeDisplayStore } from './time-display.store';

@Component({
    selector: 'app-time-display',
    standalone: true,
    templateUrl: "./time-display.html",
    styleUrl: './time-display.css',
    providers: [TimeDisplayStore]
})
export class TimeDisplay {
    protected readonly timeDisplayStore = inject(TimeDisplayStore);
}
