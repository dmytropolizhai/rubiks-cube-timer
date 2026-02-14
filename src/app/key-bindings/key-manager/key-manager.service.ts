import { Injectable, inject, DestroyRef } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { fromEvent } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommandStore } from "./command/command.store";
import { CommandMap } from "./types";
import { KeyIdentifier } from "./key-identifier";


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

                const keyIdentifier = new KeyIdentifier(event);
                
                const key = keyIdentifier.toString();
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

}
