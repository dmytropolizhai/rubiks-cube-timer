import { Component, computed, inject } from "@angular/core";
import { StopwatchService } from "../stopwatch.service";

@Component({
    'selector': "stopwatch-time",
    template: `
        <div class="stopwatch-time" [class.preparing]="stopwatch.isPreparing()"
            [class.ready]="stopwatch.isReady()"
            [class.running]="stopwatch.isRunning()">
            {{ formattedTime() }}
        </div>
    `,
    styleUrl: "./stopwatch-time.css"
})
export class StopwatchTimeComponent {
    protected readonly stopwatch = inject(StopwatchService);
    protected readonly formattedTime = computed(() => (this.stopwatch.elapsedTime() / 1000).toFixed(2));
}