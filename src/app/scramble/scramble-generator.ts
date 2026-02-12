import { computed, Injectable, signal } from "@angular/core";

/**
 * Generates a random scramble for a 3x3x3 Rubik's Cube.
 */
@Injectable({
    providedIn: 'root'
})
export class ScrambleGenerator {
    private readonly _moves = ['R', 'L', 'U', 'D', 'F', 'B'];
    private readonly _modifiers = ['', "'", '2'];

    private _current = signal('');
    private _generatedMoves: string[] = [];

    /**
     * The current scramble.
     */
    readonly current = computed(() => this._current());

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

    /**
     * Generates a scramble of a given length.
     * @param length The length of the scramble.
     * @returns The generated scramble.
     */
    generate(length: number): string {
        for (let i = 0; i < length; i++) {
            let move = this.generateMove();
            let modifier = this.generateModifier();
            let fullMove = move + modifier;

            if (this._generatedMoves.length === 0) {
                this._generatedMoves.push(fullMove);
                this._current.set(fullMove + ' ');
                continue;
            }
            const previousFullMove = this._generatedMoves[this._generatedMoves.length - 1];

            while (previousFullMove === fullMove || previousFullMove.slice(0, 1) === move) {
                move = this.generateMove();
                modifier = this.generateModifier();
                fullMove = move + modifier;
            }

            this._generatedMoves.push(fullMove);
            this._current.set(this._current() + fullMove + ' ');
        }
        return this._current().trim();
    }

    /**
     * Generates a new scramble.
     * @param length The length of the scramble.
     * @returns The new scramble.
     */
    regenerate(length: number): string {
        this._current.set('');
        this._generatedMoves = [];

        return this.generate(length);
    }
}