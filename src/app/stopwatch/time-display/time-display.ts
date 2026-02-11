import { Component, computed, inject } from '@angular/core';
import { StopwatchStore } from '../stopwatch.store';

@Component({
    selector: 'app-time-display',
    standalone: true,
    templateUrl: "./time-display.html",
    styleUrl: './time-display.css'
})
export class TimeDisplay {
    protected readonly store = inject(StopwatchStore);

    readonly formattedTime = computed(() => {
        const totalMs = this.store.elapsed();

        const minutes = Math.floor(totalMs / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const centiseconds = Math.floor((totalMs % 1000) / 10);

        if (minutes > 0) {
            return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
        }

        return `${seconds}.${centiseconds.toString().padStart(2, '0')}`;
    });
}
