import { Component, computed, signal, OnDestroy, inject, effect } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { GlobalKeyService } from "../keybindings/global-key-service";


@Component({
    selector: 'app-stopwatch',
    standalone: true,
    templateUrl: './stopwatch.html',
    styleUrl: './stopwatch.css',
    imports: [MatButtonModule],
})
export class Stopwatch implements OnDestroy {
    private globalKeyService = inject(GlobalKeyService);

    private isRunning = signal(false);
    private elapsedTime = signal(0); // in milliseconds
    private intervalId: number | null = null;

    readonly running = this.isRunning.asReadonly();
    readonly elapsed = this.elapsedTime.asReadonly();

    // Computed formatted time (mm:ss:ms)
    readonly formattedTime = computed(() => {
        const totalMs = this.elapsed();
        const minutes = Math.floor(totalMs / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const milliseconds = Math.floor((totalMs % 1000) / 10);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
    });

    readonly buttonText = computed(() => (this.running() ? "Stop" : "Start"));

    start(): void {
        if (this.isRunning()) return;
        this.isRunning.set(true);
        const startTime = Date.now() - this.elapsed();

        this.intervalId = window.setInterval(() => {
            this.elapsedTime.set(Date.now() - startTime);
        }, 10);
    }

    stop(): void {
        if (!this.isRunning()) return;
        this.isRunning.set(false);

        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset(): void {
        this.stop();
        this.elapsedTime.set(0);
    }

    ngOnDestroy(): void {
        this.stop();
    }



    constructor() {
        effect(() => {
            if (this.globalKeyService.isPressed('Space')) {
                console.log('Space pressed');
                this.start();
            }
        })
    }

}
