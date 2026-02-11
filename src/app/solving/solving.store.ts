import { Injectable, signal } from "@angular/core";
import { Solving } from "./solving.types";

@Injectable({
    providedIn: 'root'
})
export class SolvingStore {
    private _solvings = signal<Solving[]>([]);
    private _currentSolving = signal<Solving | null>(null);

    readonly currentSolving = this._currentSolving.asReadonly();

    /**
     * Adds a new solving to the store.
     * @param solving The solving to add.
     */
    add(solving: Solving) {
        this._solvings.update((solvings) => [...solvings, solving]);
        this._currentSolving.set(solving);
    }

    /**
     * Clears all solvings from the store.
     */
    clear() {
        this._solvings.set([]);
    }

    /**
     * Gets the solvings as a readonly signal.
     */
    get solvings() {
        return this._solvings.asReadonly();
    }

    /**
     * Gets the average time of all solvings.
     */
    get average() {
        return this._solvings().reduce((acc, solving) => acc + solving.timeMs, 0) / this._solvings().length;
    }

    /**
     * Gets the best time of all solvings.
     */
    get best() {
        return this._solvings().reduce((acc, solving) => Math.min(acc, solving.timeMs), Infinity);
    }

    /**
     * Gets the worst time of all solvings.
     */
    get worst() {
        return this._solvings().reduce((acc, solving) => Math.max(acc, solving.timeMs), 0);
    }

    /**
     * Gets the count of all solvings.
     */
    get count() {
        return this._solvings().length;
    }
}