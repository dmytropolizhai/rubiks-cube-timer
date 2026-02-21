import { Key } from "./types";

/**
 * Identifies keys pressed in a KeyboardEvent.
 */
export class KeyIdentifier {
    private _keys: Key[] = [];

    private static readonly MODIFIERS = new Map<Key, keyof KeyboardEvent>([
        ["control", "ctrlKey"],
        ["shift", "shiftKey"],
        ["alt", "altKey"],
        ["meta", "metaKey"],
    ]);

    constructor(event: KeyboardEvent) {
        const isKeyUp = event.type === 'keyup';
        const mainKey = event.key.toLowerCase().replace(' ', 'space');

        KeyIdentifier.MODIFIERS.forEach((prop, name) => {
            // On keyup of a modifier key, the corresponding property (e.g. ctrlKey) might already be false.
            // We include the modifier if the property is true, OR if this IS the modifier key that was just released.
            if (event[prop] || (isKeyUp && mainKey === name)) {
                this._keys.push(name);
            }
        });

        if (![...KeyIdentifier.MODIFIERS.keys()].includes(mainKey)) {
            this._keys.push(mainKey);
        }
    }

    toString(): string {
        return this._keys.join("+");
    }
}
