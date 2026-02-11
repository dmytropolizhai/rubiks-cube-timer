import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GlobalKeyService {
    // Signal to expose the last pressed key
    readonly lastKeyPressed = signal<KeyboardEvent | null>(null);

    constructor() {
        // Listen to keydown on the full document
        fromEvent<KeyboardEvent>(document, 'keydown')
            .pipe(
                // Filter if needed (example: ignore modifier keys)
                filter((event) => !event.metaKey && !event.ctrlKey && !event.altKey)
            )
            .subscribe((event) => {
                event.preventDefault(); // optional: prevent default scrolling for spacebar
                this.lastKeyPressed.set(event);
            });
    }

    isPressed(key: string): boolean {
        return this.lastKeyPressed()?.code === key;
    }
}
