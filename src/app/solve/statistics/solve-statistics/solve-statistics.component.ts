import { Component, computed, inject, input } from "@angular/core";
import { SolveStatistics } from "../statistics.service";


@Component({
    selector: 'app-solve-statistics',
    template: `
        <div class="solve-statistics">
            <ul class="solve-statistics__list">
                @for (statistic of statisticsList(); track statistic.label) {
                    <li class="solve-statistics__item">
                        <p class="solve-statistics__item__label">{{ statistic.label }}</p>
                        <span class="primary-container">{{ statistic.value }}</span>
                    </li>
                }
            </ul>
        </div>
    `,
    styleUrl: './solve-statistics.component.css'
})
export class SolveStatisticsComponent {
    placeholder = input<string>('--');

    private _statistics = inject(SolveStatistics);

    protected statisticsList = computed(() => [
        {
            label: 'Best',
            value: this._statistics.bestSolve()?.formattedTime ?? this.placeholder()
        },
        {
            label: 'Worst',
            value: this._statistics.worstSolve()?.formattedTime ?? this.placeholder()
        },
        {
            label: 'Ao5',
            value: this._statistics.ao5()?.formattedTime ?? this.placeholder()
        },
        {
            label: 'Ao12',
            value: this._statistics.ao12()?.formattedTime ?? this.placeholder()
        }
    ]);
}