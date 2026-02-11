import { Component, inject } from "@angular/core";
import { SolvingItem } from "./solving-item/solving-item";
import { SolvingStore } from "./solving.store";

@Component({
    selector: 'app-solving-list',
    template: `
        <ul class="solving-list">
            @for (solving of solvings(); track solving.id) {
                <app-solving-item [solving]="solving"></app-solving-item>
            }
        </ul>
    `,
    styles: `
        .solving-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
    `,
    standalone: true,
    imports: [SolvingItem]
})
export class SolvingList {
    private solvingStore = inject(SolvingStore);
    solvings = this.solvingStore.solvings;
}