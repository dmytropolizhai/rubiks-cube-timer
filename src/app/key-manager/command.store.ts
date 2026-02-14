import { Injectable, signal } from "@angular/core";
import { Key, Command } from "./types";

type CommandMap = Partial<Record<Key, Command>>

@Injectable({
    providedIn: "root"
})
export class CommandStore {
    private _commands = signal<CommandMap>({});

    get commands(): Readonly<CommandMap> {
        return this._commands();
    }

    register(commands: CommandMap) {
        this._commands.set({
            ...this._commands(),
            ...commands
        });

        return () => {
            const updated = { ...this._commands() };
            Object.keys(commands).forEach(key => delete updated[key]);
            this._commands.set(updated);
        };
    }

}