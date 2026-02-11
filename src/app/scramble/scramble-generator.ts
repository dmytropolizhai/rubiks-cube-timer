import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScrambleGenerator {
    private readonly moves = ['R', 'L', 'U', 'D', 'F', 'B'];
    private readonly modifiers = ['', "'", '2'];

    generateScramble(length: number): string {
        let scramble = '';
        for (let i = 0; i < length; i++) {
            const move = this.moves[Math.floor(Math.random() * this.moves.length)];
            const modifier = this.modifiers[Math.floor(Math.random() * this.modifiers.length)];
            scramble += move + modifier + ' ';
        }
        return scramble.trim();
    }
}