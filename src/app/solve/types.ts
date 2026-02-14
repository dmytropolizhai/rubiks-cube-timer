import { Scramble } from "../scramble/types";

export type Solve = {
    id: string;
    scramble: Scramble;
    time: number;
    date: Date;
}