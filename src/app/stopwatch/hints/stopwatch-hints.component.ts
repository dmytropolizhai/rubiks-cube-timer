import { Component, inject } from "@angular/core";
import { StopwatchService } from "../stopwatch.service";

@Component({
    selector: "stopwatch-hints",
    template: `
    @if (!stopwatch.isRunning()) {
        <div class="hints">
            @if (stopwatch.isIdle()) {
            <p>Hold <span class="key">Space</span> to start</p>
            } @else if (stopwatch.isPreparing()) {
            <p>Keep holding...</p>
            } @else if (stopwatch.isReady()) {
            <p>Release to start!</p>
            }
        </div>
        }
    `,
    styleUrl: "./stopwatch-hints.css"
})
export class StopwatchHintsComponent {
    readonly stopwatch = inject(StopwatchService)
}   