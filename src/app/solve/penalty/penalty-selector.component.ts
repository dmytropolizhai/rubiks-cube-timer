import { Component, inject } from "@angular/core";
import { PenaltyService } from "./penalty.service";
import { Penalty } from "./types";

@Component({
    selector: "solve-penalty-selector",
    template: `
        <select class="primary-container" (change)="onPenaltyChange($event)">
            <option value="OK">OK</option>
            <option value="+2">+2</option>
            <option value="DNF">DNF</option>
        </select>
    `,
})
export class PenaltySelector {
    private readonly _penaltyService = inject(PenaltyService);

    onPenaltyChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        const penalty = target.value as Penalty;

        this._penaltyService.setPenalty(penalty);
    }
}
