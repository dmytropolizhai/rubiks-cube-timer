import { Injectable, signal } from "@angular/core";
import { Solve } from "../types";

@Injectable({
    providedIn: 'root'
})
export class SolveHistory {
    private solves = signal<Solve[]>([]);

    addSolve(solve: Solve) {
        this.solves.update((solves) => [...solves, solve]);
    }
    
    getAll() {
        return this.solves();
    }
}