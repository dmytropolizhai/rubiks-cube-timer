import { HoldCommand, TapCommand } from "./";

/**
 * Type guard to check if the action is a tap action.
 * @param action The action to check.
 * @returns True if the action is a tap action, false otherwise.
 */
export function isTapAction(action: TapCommand | HoldCommand): action is TapCommand {
    return !("duration" in action);
}

/**
 *  Type guard to check if the action is a hold action.
 * @param action The action to check.
 * @returns True if the action is a hold action, false otherwise.
 */
export function isHoldAction(action: TapCommand | HoldCommand): action is HoldCommand {
    return "duration" in action;
}