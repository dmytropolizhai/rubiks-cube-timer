import { computed, EventEmitter, Injectable, signal } from "@angular/core";
import { StopwatchState } from "./types";

@Injectable({
    providedIn: "root"
})
export class StopwatchService {
    private _state = signal<StopwatchState>("idle");

    private _elapsedTime = signal(0);
    private _intervalId: any;
    private _startTime = 0;
    
    state = computed(() => this._state());
    elapsedTime = computed(() => this._elapsedTime());
    
    isIdle = computed(() => this._state() === "idle");
    isPreparing = computed(() => this._state() === "preparing");
    isReady = computed(() => this._state() === "ready");
    isRunning = computed(() => this._state() === "running");
    isFinished = computed(() => this._state() === "finished");
    
    onFinish = new EventEmitter<void>();

    prepare() {
        if (this.isRunning()) {
            this.stop();
            return;
        }

        if (this.isIdle() || this.isFinished()) {
            this._state.set("preparing");
        }
    }

    ready() {
        if (this.isPreparing()) {
            this._state.set("ready");
        }
    }

    start() {
        this._state.set("running");
        this._startTime = performance.now();
        this._elapsedTime.set(0);

        this._intervalId = setInterval(() => {
            this._elapsedTime.set(performance.now() - this._startTime);
        }, 10);
    }

    stop() {
        if (this.isRunning()) {
            clearInterval(this._intervalId);
            this._elapsedTime.set(performance.now() - this._startTime);
            this._state.set("finished");
            this.onFinish.emit();
        }
    }

    reset() {
        clearInterval(this._intervalId);
        this._state.set("idle");
        this._elapsedTime.set(0);
    }

}