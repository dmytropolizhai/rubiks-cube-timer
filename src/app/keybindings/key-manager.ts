import { Injectable, signal, computed, DestroyRef, inject, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { KeyState } from './key-manager.types';


@Injectable({
    providedIn: 'root',
})
export class KeyManager {
    private readonly destroyRef = inject(DestroyRef);

    // Store current key states as signals for better reactivity
    private readonly _keyStates = signal<Map<string, KeyState>>(new Map());
    private readonly _lastEvent = signal<KeyState | null>(null);

    constructor() {
        this.initializeKeyListeners();
    }

    private initializeKeyListeners(): void {
        const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
            filter((event) => !event.metaKey && !event.ctrlKey && !event.altKey),
            map((event) => ({ event, type: 'keydown' as const }))
        );

        const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
            map((event) => ({ event, type: 'keyup' as const }))
        );

        merge(keydown$, keyup$)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(({ event, type }) => {
                this.handleKeyEvent(event, type);
            });
    }

    private handleKeyEvent(event: KeyboardEvent, type: 'keydown' | 'keyup'): void {
        const keyState: KeyState = {
            code: event.code,
            type,
            timestamp: Date.now(),
            repeat: event.repeat,
        };

        // Update key states map
        this._keyStates.update(states => {
            const newStates = new Map(states);

            if (type === 'keydown') {
                newStates.set(event.code, keyState);
            } else {
                newStates.delete(event.code);
            }

            return newStates;
        });

        // Update last event
        this._lastEvent.set(keyState);
    }

    /**
     * Check if a key is currently pressed
     * @param key - The key to check
     * @returns True if the key is currently pressed, false otherwise
     */
    isPressed(key: string): boolean {
        return this._keyStates().has(key);
    }

    /**
     * Check if key was just pressed (single frame check)
     * @param key - The key to check
     * @returns True if the key was just pressed, false otherwise
     */
    wasPressed(key: string): boolean {
        const event = this._lastEvent();
        return event?.code === key && this.isKeyDown(key);
    }

    /**
     * Check if key was pressed once (not a repeat)
     * @param key - The key to check
     * @returns True if the key was pressed once, false otherwise
     */
    wasPressedOnce(key: string): boolean {
        const event = this._lastEvent();
        return event?.code === key && this.isKeyDown(key) && !event.repeat;
    }

    /**
     * Check if key has been held for specified duration
     * @param key - The key to check
     * @param durationMs - The duration in milliseconds
     * @returns True if the key has been held for the specified duration, false otherwise
     */
    isHeldFor(key: string, durationMs: number): boolean {
        const keyState = this._keyStates().get(key);

        if (!keyState) {
            return false;
        }

        return Date.now() - keyState.timestamp >= durationMs;
    }

    /**
     * Check if key was just released
     * @param key - The key to check
     * @returns True if the key was just released, false otherwise
     */
    wasReleased(key: string): boolean {
        const event = this._lastEvent();
        return event?.code === key && this.isKeyUp(key);
    }

    /**
     * Get all currently pressed keys
     * @returns An array of currently pressed keys
     */
    getPressedKeys(): readonly string[] {
        return Array.from(this._keyStates().keys());
    }

    /**
     * Create a computed signal that tracks if a key is pressed
     * @param key - The key to track
     * @returns A signal that tracks if the key is pressed
     */
    createKeySignal(key: string): Signal<boolean> {
        return computed(() => {
            return this._keyStates().has(key);
        });
    }

    isKeyDown(key: string): boolean {
        return this._lastEvent()?.type === 'keydown' && this._lastEvent()?.code === key;
    }

    isKeyUp(key: string): boolean {
        return this._lastEvent()?.type === 'keyup' && this._lastEvent()?.code === key;
    }
}