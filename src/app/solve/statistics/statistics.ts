import { Injectable, inject } from "@angular/core";
import { SolveHistory } from "../history/solve-history";
import { Solve } from "../types";

@Injectable({
    providedIn: 'root'
})
export class SolveStatistics {
    private _history = inject(SolveHistory);
    private _solves = this._history.getAll();


    getWorstSolve(): Solve {
        return this._solves.reduce((prev, current) => prev.time > current.time ? prev : current);
    }

    getBestSolve(): Solve {
        return this._solves.reduce((prev, current) => prev.time < current.time ? prev : current);
    }

    /**
     * To calculate the Ao5, we need to take the best 5 solves remove worst and best solve from the history and calculate the average.
     * TODO: Change logic to calculate Ao5 from the last 5 solves.
     */
    getAo5(): number {
        if (this._solves.length < 5) {
            return 0;
        }
        const bestSolve = this.getBestSolve();
        const worstSolve = this.getWorstSolve();

        const solves = this._solves.filter(solve => solve.id !== bestSolve.id && solve.id !== worstSolve.id);
        const sum = solves.map(solve => solve.time).reduce((prev, current) => prev + current);

        return sum / solves.length;
    }

    /**
     * To calculate the Ao12, we need to take the best 12 solves remove worst and best solve from the history and calculate the average.
     * TODO: Change logic to calculate Ao12 from the last 12 solves.
     */
    getAo12(): number {
        if (this._solves.length < 12) {
            return 0;
        }
        const bestSolve = this.getBestSolve();
        const worstSolve = this.getWorstSolve();

        const solves = this._solves.filter(solve => solve.id !== bestSolve.id && solve.id !== worstSolve.id);
        const sum = solves.map(solve => solve.time).reduce((prev, current) => prev + current);

        return sum / solves.length;
    }
}