import { Injectable, signal } from "@angular/core";
import { CommandMap } from "../types";


@Injectable({
    providedIn: "root"
})
export class CommandStore {
    private _commands = signal<CommandMap>({});

    get commands(): Readonly<CommandMap> {
        return this._commands();
    }

    set commands(commands: CommandMap) {
        this._commands.set(commands);
    }
}