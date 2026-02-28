import { Injectable, inject, signal } from "@angular/core";
import { Penalty } from "./types";
import { SolveHistoryService } from "../history/solve-history.service";

@Injectable({
    providedIn: "root"
})
export class PenaltyService {
    private readonly _solveHistory = inject(SolveHistoryService);

    private _penalty = signal<Penalty>('OK');
    penalty = this._penalty.asReadonly();

    setPenalty(penalty: Penalty) {
        this._penalty.set(penalty);
        this._solveHistory.updateCurrentSolve({ penalty });
        console.log('Penalty set to:', this._penalty(), 'for solve with id', this._solveHistory.currentSolve().id);
    }
}