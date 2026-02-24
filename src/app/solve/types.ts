import { Scramble } from "../scramble/types";
import { Penalty } from "./penalty";


export type Solve = {
    id: number;
    scramble: Scramble;
    penalty: Penalty;
    elapsedTime: number;
    formattedTime: string;
    date: Date;
}