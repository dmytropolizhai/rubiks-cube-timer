export type Key = "space" | "r" | "control" | "shift" | "alt" | "meta" | (string & {});


export type Command = {
    description?: string;
    action: (event: Omit<KeyboardEvent, "preventDefault">) => void;
    preventDefault?: boolean;
}

export type CommandMap = Partial<Record<Key, Command>>