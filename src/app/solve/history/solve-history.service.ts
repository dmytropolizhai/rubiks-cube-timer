import { Injectable, signal } from "@angular/core";
import { Solve } from "../types";

@Injectable({
    providedIn: 'root'
})
export class SolveHistoryService {
    private _solves = signal<Solve[]>([]);
    solves = this._solves.asReadonly();

    addSolve(solve: Omit<Solve, 'id'>) {
        const newSolve: Solve = {
            id: this._solves().length + 1,
            ...solve
        };

        this._solves.update((solves) => [...solves, newSolve]);
    }

}