import { Component, inject } from "@angular/core";
import { StopwatchStore } from "./stopwatch.store";
import { TimeDisplay } from "./time-display/time-display";
import { Hints } from "./hints/hints";

@Component({
    selector: 'app-stopwatch',
    standalone: true,
    templateUrl: './stopwatch.html',
    styleUrl: './stopwatch.css',
    providers: [StopwatchStore],
    imports: [TimeDisplay, Hints]
})
export class Stopwatch {
    private readonly store = inject(StopwatchStore);
}
