import { Component, inject, signal } from "@angular/core";
import { ScrambleStore } from "./scramble.store";

const SCRAMBLE_LENGTH = 15;

@Component({
    selector: 'app-scramble',
    template: `
        <section class="scramble">
            {{ scramble() }}
        </section>
    `,
    styles: `
        .scramble {
            font-size: 2rem;
            font-weight: 400;
            letter-spacing: 0.1rem;
            text-align: center;
        }
    `
})
export class Scramble {
    private readonly _scrambleGenerator = inject(ScrambleStore);
    public scramble = signal(this._scrambleGenerator.generateScramble(SCRAMBLE_LENGTH));

    public generateScramble(): void {
        this.scramble.set(this._scrambleGenerator.generateScramble(SCRAMBLE_LENGTH));
    }
}