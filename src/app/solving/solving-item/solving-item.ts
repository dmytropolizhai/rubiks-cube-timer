import { Component, input } from "@angular/core";
import { Solving } from "../solving.types";

@Component({
    selector: 'app-solving-item',
    template: `
        <li class="solving-item">
            <span class="time">{{ solving().formattedTime }}</span>
            <div class="scramble">
                <h2>Scramble</h2>
                <p>{{ solving().scramble }}</p>
            </div>
        </li>
    `,
    styleUrl: './solving-item.css',
    standalone: true
})
export class SolvingItem {
    solving = input.required<Solving>();

}