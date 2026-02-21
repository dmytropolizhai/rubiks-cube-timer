import { Component, inject } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { StopwatchService } from "../stopwatch.service";

@Component({
    'selector': "stopwatch-time",
    template: `
        <div class="stopwatch-time" [class.preparing]="stopwatch.isPreparing()"
            [class.ready]="stopwatch.isReady()"
            [class.running]="stopwatch.isRunning()">
            {{ stopwatch.elapsedTime() / 1000 | number: '1.2-2' }}
        </div>
    `,
    imports: [DecimalPipe],
    styleUrl: "./stopwatch-time.css"
})
export class StopwatchTimeComponent {
    protected readonly stopwatch = inject(StopwatchService);
}