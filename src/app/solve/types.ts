import { Scramble } from "../scramble/types";

export type Solve = {
    id: number;
    scramble: Scramble;
    elapsedTime: number;
    date: Date;
}