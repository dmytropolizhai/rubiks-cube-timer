import { DestroyRef, inject } from "@angular/core"
import { KeyManager } from "./key-manager/key-manager.service"
import { CommandMap } from "./key-manager/types";

/**
 * Provide key bindings for the application. 
 * Should be called in the constructor of the component that wants to use key bindings.
 * 
 * To provide multiple key bindings, use the + operator:
 * ```typescript
 * provideKeyBindings({
 *   "control+r": {
 *      ...
 *   }
 * });
 * ```
 * @param commands {CommandMap}
 */
export function provideKeyBindings(commands: CommandMap) {
    const keyManager = inject(KeyManager);
    const destroyRef = inject(DestroyRef);

    const dispose = keyManager.register(commands);
    destroyRef.onDestroy(dispose);
}