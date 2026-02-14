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
        KeyIdentifier.MODIFIERS.forEach((prop, name) => {
            if (event[prop]) {
                this._keys.push(name);
            }
        });
        const mainKey = event.key.toLowerCase().replace(" ", "space");

        if (![...KeyIdentifier.MODIFIERS.keys()].includes(mainKey)) {
            this._keys.push(mainKey);
        }
    }

    toString(): string {
        return this._keys.join("+");
    }
}
