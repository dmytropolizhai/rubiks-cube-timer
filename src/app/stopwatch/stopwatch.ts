import { Component, effect, inject } from "@angular/core";
import { StopwatchStore } from "./stopwatch.store";
import { TimeDisplay } from "./time-display/time-display";
import { Hints } from "./hints/hints";
import { SolvingStore } from "../solving/solving.store";
import { StopwatchState } from "./stopwatch.types";
import { ScrambleGenerator } from "../scramble/scramble-generator";
import { TimeDisplayStore } from "./time-display/time-display.store";

@Component({
    selector: 'app-stopwatch',
    standalone: true,
    templateUrl: './stopwatch.html',
    styleUrl: './stopwatch.css',
    providers: [StopwatchStore],
    imports: [TimeDisplay, Hints]
})
export class Stopwatch {
    private readonly stopwatchStore = inject(StopwatchStore);
    private readonly solvingStore = inject(SolvingStore);
    private readonly scrambleGenerator = inject(ScrambleGenerator);
    private readonly timeDisplayStore = inject(TimeDisplayStore);

    constructor() {
        effect(() => {
            if (this.stopwatchStore.state() === StopwatchState.FINISHED) {
                this.solvingStore.add({
                    id: crypto.randomUUID(),
                    timeMs: this.stopwatchStore.elapsed(),
                    formattedTime: this.timeDisplayStore.formattedTime(),
                    scramble: this.scrambleGenerator.current(),
                });
                this.scrambleGenerator.regenerate(20);
            }
        });
    }
}
