import { Injectable, signal } from "@angular/core";
import { Penalty } from "./types";

@Injectable({
    providedIn: "root"
})
export class PenaltyService {
    private _penalty = signal<Penalty>('OK');

    penalty = this._penalty.asReadonly();

    setPenalty(penalty: Penalty) {
        this._penalty.set(penalty);
    }
}