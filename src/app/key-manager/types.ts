export type Key = "space" | "r" | (string & {});

export type Command = {
    description?: string;
    action: (event: Omit<KeyboardEvent, "preventDefault">) => void;
    preventDefault?: boolean;
}