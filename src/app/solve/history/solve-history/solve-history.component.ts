import { Component, inject, input } from "@angular/core";
import { SolveHistoryService } from "../solve-history.service";
import { PenaltySelector } from "../../penalty/penalty-selector/penalty-selector.component";


/**
 * Component for displaying a single field in the solve history.
 */
@Component({
    selector: "solve-history-field",
    styleUrl: './solve-history.component.css',
    template: `
        <dt class="solve-entry__label">{{ label() }}</dt>
        <dd class="solve-entry__value">{{ value() }}</dd>
    `,
    standalone: true,
})
export class SolveHistoryField {
    label = input.required<string>();
    value = input.required<string>();
}

/**
 * Component for displaying the title of the solve history.
 */
@Component({
    selector: "solve-history-title",
    template: `
        <h2 id="solve-history-title" class="solve-history__title">
            Solve History
        </h2>
    `,
    styleUrl: './solve-history.component.css',
    standalone: true,
})
export class SolveHistoryTitle {

}

/**
 * Component for displaying the solve history.
 */
@Component({
    selector: 'app-solve-history',
    template: `
        <section class="solve-history" aria-labelledby="solve-history-title">
            <solve-history-title />

            <ul class="solve-history__list">
                @for (solve of solves(); track solve.id) {
                    <li class="solve-history__item">
                        <dl class="solve-entry">
                            <solve-history-field label="Time" [value]="solve.formattedTime" />
                            <solve-history-field label="Date" [value]="solve.date.toLocaleString()" />
                            <solve-history-field label="Scramble" [value]="solve.scramble" />

                            <solve-penalty-selector />
                        </dl>
                    </li>
                }
            </ul>
        </section>
    `,
    styleUrl: './solve-history.component.css',
    imports: [PenaltySelector, SolveHistoryField, SolveHistoryTitle],
})
export class SolveHistory {
    private _history = inject(SolveHistoryService);

    protected solves = this._history.solves;
}