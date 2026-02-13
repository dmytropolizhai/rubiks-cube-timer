import { Component, inject } from "@angular/core";
import { SolveHistory } from "./solve-history";


@Component({
    selector: 'app-solve-history',
    template: `
        <section class="solve-history">
            <ul class="solve-history__list">
                @for (solve of solves; track solve.id) {
                    <li class="solve-history__item">
                        <span class="solve-history__item-time">{{ solve.time }}</span>
                    </li>
                }
            </ul>
        </section>
    `,
    styleUrl: './solve-history.component.css',
})
export class SolveHistoryComponent {
    private _history = inject(SolveHistory);

    protected solves = this._history.getAll();
}