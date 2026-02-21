import { Injectable, inject, DestroyRef } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { fromEvent } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommandStore } from "./command/command.store";
import { CommandMap } from "./types";
import { KeyIdentifier } from "./key-identifier";
import { isTapAction } from "./types/guards";


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
                const keyIdentifier = new KeyIdentifier(event);
                const key = keyIdentifier.toString();
                const command = this._commandStore.commands[key];

                if (!command) return;

                if (command.preventDefault) {
                    event.preventDefault();
                }

                if (event.repeat) return;


                const action = command.action;
                if (isTapAction(action)) {
                    action(event);
                } else {
                    action.immediate?.(event);

                    let started = false;
                    const timeout = setTimeout(() => {
                        started = true;
                        action.start?.(event);
                    }, action.duration);

                    const keyup$ = fromEvent<KeyboardEvent>(this._document, "keyup")
                        .pipe(takeUntilDestroyed(this._destroyRef))
                        .subscribe(e => {
                            if (new KeyIdentifier(e).toString() === key) {
                                clearTimeout(timeout);
                                if (started) {
                                    action.stop?.(e);
                                } else {
                                    action.cancel?.(e);
                                }
                                keyup$.unsubscribe();
                            }
                        });
                }
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
