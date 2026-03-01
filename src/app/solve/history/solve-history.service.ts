import { computed, Injectable, signal } from "@angular/core";
import { Solve } from "../types";
import { Penalty } from "../penalty";

@Injectable({
    providedIn: 'root'
})
export class SolveHistoryService {
    private _solves = signal<Solve[]>([]);
    solves = this._solves.asReadonly();

    currentSolve = computed(() => this._solves.asReadonly()()[0]);

    /**
     * Formats the elapsed time in milliseconds to a string representation.
     * @param timeMs The elapsed time in milliseconds.
     * @param penalty The penalty to apply to the elapsed time.
     * @returns The formatted time as a string.
     */
    private formatTime(timeMs: number, penalty: Penalty) {
        if (penalty === "DNF") return "DNF";
        const totalMs = penalty === "+2" ? timeMs + 2000 : timeMs;

        return (totalMs / 1000).toFixed(2);
    }

    /**
     * Adds a new solve to the solve history.
     * @param solve The solve to add to the solve history.
     */
    addSolve(solve: Omit<Solve, 'id' | 'formattedTime'>) {
        console.log(`Adding to solve history: 
            Scramble: ${solve.scramble} 
            Elapsed time: ${solve.elapsedTime}
            Date: ${solve.date}
            Penalty: ${solve.penalty}
        `);

        const newSolve: Solve = {
            id: this._solves().length + 1,
            formattedTime: this.formatTime(solve.elapsedTime, solve.penalty),
            ...solve,
        };

        this._solves.update((solves) => [newSolve, ...solves]);
    }

    /**
     * Updates the penalty for the current solve.
     * @param penalty The penalty to apply to the current solve.
     */
    updateCurrentSolvePenalty(penalty: Penalty) {
        this._solves.update(solves => {
            if (solves.length === 0) return solves;

            const current = solves[0]

            const updatedSolve = {
                ...current,
                penalty,
                formattedTime: this.formatTime(current.elapsedTime, penalty)
            }

            return [updatedSolve, ...solves.slice(1)];
        })
    }

}