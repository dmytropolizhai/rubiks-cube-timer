import { Injectable, inject, computed } from "@angular/core";
import { SolveHistoryService } from "../history/solve-history.service";

@Injectable({
    providedIn: 'root'
})
export class SolveStatistics {
    private _history = inject(SolveHistoryService);
    private _solves = this._history.solves;

    bestSolve = computed(() => {
        const solves = this._solves();
        if (solves.length < 2) return null;

        return solves.reduce((prev, current) =>
            prev.elapsedTime < current.elapsedTime ? prev : current
        );
    });

    worstSolve = computed(() => {
        const solves = this._solves();
        if (solves.length < 2) return null;

        return solves.reduce((prev, current) =>
            prev.elapsedTime > current.elapsedTime ? prev : current
        );
    });

    ao5 = computed(() => {
        const solves = this._solves();
        if (solves.length < 5) return null;

        const last5 = solves.slice(-5);
        const sorted = [...last5].sort((a, b) => a.elapsedTime - b.elapsedTime);
        const trimmed = sorted.slice(1, -1); // remove best + worst
        const sum = trimmed.reduce((acc, s) => acc + s.elapsedTime, 0);

        return sum / trimmed.length;
    });

    ao12 = computed(() => {
        const solves = this._solves();
        if (solves.length < 12) return null;

        const last12 = solves.slice(-12);
        const sorted = [...last12].sort((a, b) => a.elapsedTime - b.elapsedTime);
        const trimmed = sorted.slice(1, -1);
        const sum = trimmed.reduce((acc, s) => acc + s.elapsedTime, 0);

        return sum / trimmed.length;
    });

}