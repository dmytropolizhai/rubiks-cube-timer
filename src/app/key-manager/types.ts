export type Key = "space" | "r" | (string & {});

export type Command = {
    description?: string;
    action: (event: Omit<KeyboardEvent, "preventDefault">) => void;
    preventDefault?: boolean;
}

export type CommandMap = Partial<Record<Key, Command>>