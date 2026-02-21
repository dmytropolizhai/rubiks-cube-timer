export type Key = "space" | "r" | "control" | "shift" | "alt" | "meta" | (string & {});

export type HoldCommand = {
    duration: number;
    immediate?: (event: Omit<KeyboardEvent, "preventDefault">) => void;
    start?: (event: Omit<KeyboardEvent, "preventDefault">) => void;
    stop?: (event: Omit<KeyboardEvent, "preventDefault">) => void;
    cancel?: (event: Omit<KeyboardEvent, "preventDefault">) => void;
}
export type TapCommand = (event: Omit<KeyboardEvent, "preventDefault">) => void;

export type Command = {
    action: TapCommand | HoldCommand;
    description?: string;
    preventDefault?: boolean;
}



export type CommandMap = Partial<Record<Key, Command>>