import { Component, inject } from "@angular/core";

import { provideKeyBindings } from "../key-bindings";

import { StopwatchHintsComponent } from "./hints";
import { StopwatchTimeComponent } from "./time";

import { StopwatchService } from "./stopwatch.service";

@Component({
    selector: "app-stopwatch",
    template: `
        <section class="stopwatch-container">
            <stopwatch-time />
            <stopwatch-hints />
        </section>
    `,
    styleUrl: "./stopwatch.component.css",
    imports: [StopwatchHintsComponent, StopwatchTimeComponent]
})
export class StopwatchComponent {
    private readonly _stopwatch = inject(StopwatchService);

    constructor() {
        provideKeyBindings({
            "space": {
                description: "Start or stop the stopwatch",
                action: {
                    duration: 500,
                    immediate: () => this._stopwatch.prepare(),
                    start: () => this._stopwatch.ready(),
                    stop: () => this.handleRelease(),
                    cancel: () => this.handleRelease()
                },
                preventDefault: true
            }
        })
    }

    handleRelease() {
        if (this._stopwatch.isReady()) {
            this._stopwatch.start();
        } else if (this._stopwatch.isPreparing()) {
            this._stopwatch.reset();
        } else if (this._stopwatch.isRunning()) {
            this._stopwatch.stop();
        } else if (this._stopwatch.isFinished()) {
            this._stopwatch.reset();
        }
    }
}