import { Component, inject, signal } from "@angular/core";
import { ScrambleGenerator } from "./scramble-generator";

const SCRAMBLE_LENGTH = 15;

@Component({
    selector: 'app-scramble',
    template: `
        <section class="scramble">
            {{ scramble() }}
        </section>
    `,
    styles: `
    `
})
export class Scramble {
    private readonly _scrambleGenerator = inject(ScrambleGenerator);
    public scramble = signal(this._scrambleGenerator.generateScramble(SCRAMBLE_LENGTH));

    public generateScramble(): void {
        this.scramble.set(this._scrambleGenerator.generateScramble(SCRAMBLE_LENGTH));
    }
}