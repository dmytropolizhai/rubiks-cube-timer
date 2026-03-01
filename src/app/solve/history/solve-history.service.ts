import { computed, Injectable, signal } from "@angular/core";
import { Solve } from "../types";

@Injectable({
    providedIn: 'root'
})
export class SolveHistoryService {
    private _solves = signal<Solve[]>([]);
    solves = this._solves.asReadonly();

    currentSolve = computed(() => this._solves.asReadonly()()[0]);

    addSolve(solve: Omit<Solve, 'id' | 'formattedTime'>) {
        console.log(`Adding to solve history: 
            Scramble: ${solve.scramble} 
            Elapsed time: ${solve.elapsedTime}
            Date: ${solve.date}
            Penalty: ${solve.penalty}
        `);

        const newSolve: Solve = {
            id: this._solves().length + 1,
            formattedTime: (solve.elapsedTime / 1000).toFixed(2),
            ...solve,
        };

        this._solves.update((solves) => [newSolve, ...solves]);
    }

    updateCurrentSolve(solve: Partial<Solve>) {
        this._solves.update((solves) => {
            const lastSolve = solves[solves.length - 1];
            const updatedSolve = { ...lastSolve, ...solve };
            return [...solves.slice(0, -1), updatedSolve];
        });
    }
}