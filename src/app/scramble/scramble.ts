import { Component, computed, inject, Input, OnChanges, signal, SimpleChanges } from "@angular/core";
import { ScrambleGenerator } from "./scramble-generator";


@Component({
    selector: 'app-scramble',
    template: `
        <section class="scramble">
            {{ currentScramble() }}
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
export class Scramble implements OnChanges {
    @Input({ required: true }) length!: number;

    private readonly _scrambleGenerator = inject(ScrambleGenerator);

    currentScramble = computed(() => this._scrambleGenerator.current());

    ngOnChanges(changes: SimpleChanges): void {
        this._scrambleGenerator.regenerate(this.length);
    }

}