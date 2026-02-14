import { Component, inject } from "@angular/core";
import { ScrambleStore } from "./service/scramble.store";

@Component({
    selector: 'app-scramble',
    template: `
        <section class="scramble">
            {{ scrambleStore.currentScramble()}}
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
export class ScrambleComponent {
    protected scrambleStore = inject(ScrambleStore)
}