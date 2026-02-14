import { Injectable, inject, DestroyRef } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { fromEvent } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommandStore } from "./command/command.store";
import { CommandMap } from "./types";


@Injectable({
    providedIn: "root"
})
export class KeyManager {
    private readonly _commandStore = inject(CommandStore);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _document = inject(DOCUMENT);


    constructor() {
        fromEvent<KeyboardEvent>(this._document, "keydown")
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(event => {
                if (event.repeat) return;

                const key = this.getKeyIdentifier(event);
                const command = this._commandStore.commands[key];

                if (!command) return;

                if (command.preventDefault) {
                    event.preventDefault();
                }

                command.action(event);
            });
    }

    register(commands: CommandMap) {
        this._commandStore.commands = {
            ...this._commandStore.commands,
            ...commands
        };

        return () => {
            const updated = { ...this._commandStore.commands };
            Object.keys(commands).forEach(key => delete updated[key]);
            this._commandStore.commands = updated;
        };
    }

    private getKeyIdentifier(event: KeyboardEvent): string {
        const keys = [];

        if (event.ctrlKey) keys.push("ctrl");
        if (event.shiftKey) keys.push("shift");
        if (event.altKey) keys.push("alt");
        if (event.metaKey) keys.push("meta");

        keys.push(event.key.toLowerCase());

        return keys.join("+");
    }
}
