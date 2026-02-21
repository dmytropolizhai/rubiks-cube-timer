import { Component, inject } from "@angular/core";
import { SolveHistoryService } from "../solve-history.service";


@Component({
    selector: 'app-solve-history',
    template: `
        <section class="solve-history">
            <ul class="solve-history__list">
                @for (solve of solves(); track solve.id) {
                    <li class="solve-history__item">
                        <span class="solve-history__item-time">{{ solve.elapsedTime }}</span>
                        <span class="solve-history__item-date">{{ solve.date }}</span>
                        <span class="solve-history__item-scramble">{{ solve.scramble }}</span>
                    </li>
                }
            </ul>
        </section>
    `,
    styleUrl: './solve-history.component.css',
})
export class SolveHistoryComponent {
    private _history = inject(SolveHistoryService);

    protected solves = this._history.solves;
}