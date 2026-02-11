import {
    Injectable,
    signal,
    computed,
    inject,
    OnDestroy,
    effect,
} from '@angular/core';
import { StopwatchState } from './stopwatch.types';
import { KeyManager } from '../keybindings/key-manager';

@Injectable({
    providedIn: 'root'
})
export class StopwatchStore implements OnDestroy {
    private readonly keyManager = inject(KeyManager);

    private readonly _state = signal<StopwatchState>(StopwatchState.IDLE);
    private readonly _elapsedTime = signal(0);

    private _intervalId: any = null;
    private _readyTimeout: any = null;
    private _startTime = 0;

    readonly state = this._state.asReadonly();
    readonly elapsed = this._elapsedTime.asReadonly();

    readonly isPreparing = computed(() => this.state() === StopwatchState.PREPARING);
    readonly isReady = computed(() => this.state() === StopwatchState.READY);
    readonly isRunning = computed(() => this.state() === StopwatchState.RUNNING);
    readonly isFinished = computed(() => this.state() === StopwatchState.FINISHED);

    constructor() {
        this.initializeKeyHandling();
    }

    private initializeKeyHandling(): void {
        effect(() => {
            const spaceJustPressed = this.keyManager.wasPressedOnce('Space');
            const spaceReleased = this.keyManager.wasReleased('Space');
            const spaceHeld = this.keyManager.isHeldFor('Space', 500);

            if (this.isRunning() && spaceJustPressed) {
                this.stop();
                return;
            }

            if (this.state() === StopwatchState.IDLE && spaceJustPressed) {
                this.prepare();
            }

            if (this.isPreparing() && spaceReleased && !spaceHeld) {
                this.cancelPrepare();
            }

            if (this.isReady() && spaceReleased) {
                this.start();
            }

            if (this.isFinished() && spaceJustPressed) {
                this.reset();
            }
        });
    }

    private prepare(): void {
        this._state.set(StopwatchState.PREPARING);
        this._elapsedTime.set(0);

        this._readyTimeout = setTimeout(() => {
            if (this.isPreparing()) {
                this._state.set(StopwatchState.READY);
            }
        }, 500);
    }

    private cancelPrepare(): void {
        this._state.set(StopwatchState.IDLE);
        this.clearReadyTimeout();
    }

    private start(): void {
        this.clearReadyTimeout();
        this._state.set(StopwatchState.RUNNING);

        this._startTime = performance.now();
        this._intervalId = setInterval(() => {
            this._elapsedTime.set(performance.now() - this._startTime);
        }, 10);
    }

    private stop(): void {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }

        const finalTime = performance.now() - this._startTime;
        this._elapsedTime.set(finalTime);
        this._state.set(StopwatchState.FINISHED);
    }

    private clearReadyTimeout(): void {
        if (this._readyTimeout) {
            clearTimeout(this._readyTimeout);
            this._readyTimeout = null;
        }
    }

    reset(): void {
        this.stop();
        this._elapsedTime.set(0);
        this._state.set(StopwatchState.IDLE);
    }

    ngOnDestroy(): void {
        this.stop();
        this.clearReadyTimeout();
    }
}
