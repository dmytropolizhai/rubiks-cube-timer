import { Component, inject } from "@angular/core";
import { SolvingItem } from "../solving-item/solving-item";
import { SolvingStore } from "../solving.store";

@Component({
    selector: 'app-solving-list',
    template: `
        <ul class="solving-list">
            @for (solving of solvings(); track solving.id) {
                <app-solving-item [solving]="solving"></app-solving-item>
            }
        </ul>
    `,
    styleUrl: './solving-list.css',
    standalone: true,
    imports: [SolvingItem]
})
export class SolvingList {
    private solvingStore = inject(SolvingStore);

    solvings = this.solvingStore.solvings;
}