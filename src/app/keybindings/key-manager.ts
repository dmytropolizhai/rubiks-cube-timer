import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class KeyManager {
    // Signal to expose the last pressed key
    readonly lastKeyPressed = signal<KeyboardEvent | null>(null);

    // Map to track when each key was first pressed down
    private _keyStartTimes = new Map<string, number>();

    constructor() {
        // Listen to keydown on the full document
        fromEvent<KeyboardEvent>(document, 'keydown')
            .pipe(
                filter((event) => !event.metaKey && !event.ctrlKey && !event.altKey)
            )
            .subscribe((event) => {
                if (!event.repeat) {
                    this._keyStartTimes.set(event.code, Date.now());
                }
                event.preventDefault();
                this.lastKeyPressed.set(event);
            });

        // Listen to keyup to clear the start time
        fromEvent<KeyboardEvent>(document, 'keyup')
            .subscribe((event) => {
                this._keyStartTimes.delete(event.code);
                this.lastKeyPressed.set(event);
            });
    }

    /**
     * Triggered when key is pressed
     * @param key 
     * @returns 
     */
    isPressed(key: string): boolean {
        const event = this.lastKeyPressed();
        return event?.code === key && event.type === 'keydown';
    }

    /**
     * Triggered when key is held for a certain amount of time
     * @param key 
     * @param timeMs 
     * @returns boolean
     */
    hold(key: string, timeMs: number): boolean {
        const event = this.lastKeyPressed();

        // Return false if key is not down or does not match
        if (!event || event.code !== key || event.type === 'keyup') {
            return false;
        }

        const startTime = this._keyStartTimes.get(key);
        if (startTime === undefined) return false;

        return Date.now() - startTime >= timeMs;
    }
}
