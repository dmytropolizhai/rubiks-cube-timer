export interface KeyState {
    code: string;
    type: 'keydown' | 'keyup';
    timestamp: number;
    repeat: boolean;
}