import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScrambleStore {
    private readonly _moves = ['R', 'L', 'U', 'D', 'F', 'B'];
    private readonly _modifiers = ['', "'", '2'];


    private _currentScramble = signal('');
    private _generatedMoves: string[] = [];

    readonly currentScramble = computed(() => this._currentScramble());

    /**
     * Generates a random move.
     * @returns A random move.
     */
    private generateMove(): string {
        return this._moves[Math.floor(Math.random() * this._moves.length)];
    }

    /**
     * Generates a random modifier for a move.
     * @returns A random modifier for a move.
     */
    private generateModifier(): string {
        return this._modifiers[Math.floor(Math.random() * this._modifiers.length)];
    }

    generateScramble(length: number): string {
        for (let i = 0; i < length; i++) {
            let move = this.generateMove();
            let modifier = this.generateModifier();
            let fullMove = move + modifier;

            if (this._generatedMoves.length === 0) {
                this._generatedMoves.push(fullMove);
                this._currentScramble.set(fullMove + ' ');
                continue;
            }
            const previousFullMove = this._generatedMoves[this._generatedMoves.length - 1];

            while (previousFullMove === fullMove || previousFullMove.slice(0, 1) === move) {
                move = this.generateMove();
                modifier = this.generateModifier();
                fullMove = move + modifier;
            }

            this._generatedMoves.push(fullMove);
            this._currentScramble.set(this._currentScramble() + fullMove + ' ');
        }
        return this._currentScramble().trim();
    }
}   