import { Component, computed, inject } from "@angular/core";
import { SolveStatistics } from "../statistics.service";


@Component({
    selector: 'app-solve-statistics',
    template: `
        <div class="solve-statistics">
            <ul class="solve-statistics__list">
                @for (statistic of statisticsList(); track statistic.label) {
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

    protected statisticsList = computed(() => [
        {
            label: 'Best',
            value: this._statistics.bestSolve()?.elapsedTime.toFixed(2) ?? '0.00'
        },
        {
            label: 'Worst',
            value: this._statistics.worstSolve()?.elapsedTime.toFixed(2) ?? '0.00'
        },
        {
            label: 'Ao5',
            value: this._statistics.ao5()?.toFixed(2) ?? '0.00'
        },
        {
            label: 'Ao12',
            value: this._statistics.ao12()?.toFixed(2) ?? '0.00'
        }
    ]);
}