import { Component, inject } from "@angular/core";
import { SolveStatistics } from "./statistics";


@Component({
    selector: 'app-solve-statistics',
    template: `
        <div class="solve-statistics">
            <ul class="solve-statistics__list">
                @for (statistic of statisticsList; track statistic.label) {
                    <li class="solve-statistics__item">
                        <p class="solve-statistics__item__label">{{ statistic.label }}</p>
                        <span class="solve-statistics__item__value">{{ statistic.value }}</span>
                    </li>
                }
            </ul>
        </div>
    `,
    styleUrl: './solve-statistics.component.css'
})
export class SolveStatisticsComponent {
    private _statistics = inject(SolveStatistics);

    protected statisticsList = [
        { label: 'Best', value: this.best },
        { label: 'Worst', value: this.worst },
        { label: 'Ao5', value: this.ao5 },
        { label: 'Ao12', value: this.ao12 }
    ]

    get best() {
        return this._statistics.getBestSolve().time || 0;
    }

    get worst() {
        return this._statistics.getWorstSolve().time || 0;
    }

    get ao5() {
        return this._statistics.getAo5() || 0;
    }

    get ao12() {
        return this._statistics.getAo12() || 0;
    }
}