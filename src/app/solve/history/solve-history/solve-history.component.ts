import { Component, inject } from "@angular/core";
import { SolveHistoryService } from "../solve-history.service";
import { DecimalPipe } from "@angular/common";

@Component({
    selector: 'app-solve-history',
    template: `
        <section class="solve-history" aria-labelledby="solve-history-title">
        <h2 id="solve-history-title" class="solve-history__title">
            Solve History
        </h2>

        <ul class="solve-history__list">
            @for (solve of solves(); track solve.id) {
            <li class="solve-history__item">
                <dl class="solve-entry">
                <dt class="solve-entry__label">Time</dt>
                <dd class="solve-entry__value">{{ solve.elapsedTime / 1000 | number: '1.2-2' }}</dd>

                <dt class="solve-entry__label">Date</dt>
                <dd class="solve-entry__value">{{ solve.date.toLocaleString() }}</dd>

                <dt class="solve-entry__label">Scramble</dt>
                <dd class="solve-entry__value solve-entry__scramble">{{ solve.scramble }}</dd>
                </dl>
            </li>
            }
        </ul>
        </section>
    `,
    styleUrl: './solve-history.component.css',
    standalone: true,
    imports: [DecimalPipe],
})
export class SolveHistoryComponent {
    private _history = inject(SolveHistoryService);

    protected solves = this._history.solves;
}