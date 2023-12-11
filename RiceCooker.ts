enum RiceCookerState {
    IDLE = 'idle',
    COOKING = 'cooking',
    WARM = 'warm',
}

export enum Commands {
    COOK = 1,
    WARM = 2,
    CANCEL = 3,
    ADD_WATER = 4,
    PLUG_IN = 5,
    UNPLUG = 6,
}

enum ErrorCodes {
    NO_WATER = 101,
    NOT_PLUGGED_IN = 102,
    BUSY = 103,
}

export class RiceCooker {
    private state: RiceCookerState = RiceCookerState.IDLE
    private hasWater: boolean = true
    private isPluggedIn: boolean = true

    cookRice() {
        if (!this.isPluggedIn) {
            console.error(`Error: ${ErrorCodes.NOT_PLUGGED_IN} - Rice cooker is not plugged in.`)
            return
        }

        if (!this.hasWater) {
            console.error(`Error: ${ErrorCodes.NO_WATER} - No water detected. Please add water and try again.`)
            return
        }

        if (this.state !== RiceCookerState.IDLE) {
            console.log('Rice cooker is already busy.')
            return
        }

        this.state = RiceCookerState.COOKING
        console.log('Cooking rice...')

        this.cookRiceAsync().then(value => {
            console.log('Rice is cooked!')
        }).catch((error) => {
            console.error(`Error: ${error}`)
        }).finally(() => {
                this.state = RiceCookerState.IDLE
            }
        )
    }

    private cookRiceAsync(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 3000)
        })
    }

    warmRice() {
        if (!this.isPluggedIn) {
            console.error(`Error: ${ErrorCodes.NOT_PLUGGED_IN} - Rice cooker is not plugged in.`)
            return
        }

        if (!this.hasWater) {
            console.error(`Error: ${ErrorCodes.NO_WATER} - No water detected. Please add water and try again.`)
            return
        }

        if (this.state !== RiceCookerState.IDLE && this.state !== RiceCookerState.WARM) {
            console.log('Rice cooker is not ready for warming.')
            return
        }

        this.state = RiceCookerState.WARM
        console.log('Warming rice...')

        // Simulate warming time
        setTimeout(() => {
            console.log('Rice is warm and ready to serve!')
            this.state = RiceCookerState.IDLE
        }, 1000)
    }

    cancel() {
        if (this.state === RiceCookerState.IDLE) {
            console.log('Nothing to cancel.')
            return
        }

        console.log('Canceling operation...')
        this.state = RiceCookerState.IDLE
        console.log('Operation canceled.')
    }

    addWater() {
        this.hasWater = true
        console.log('Water added successfully.')
    }

    plugIn() {
        this.isPluggedIn = true
        console.log('Rice cooker plugged in.')
    }

    unplug() {
        if (this.state !== RiceCookerState.IDLE) {
            console.error(`Error: ${ErrorCodes.BUSY} - Rice cooker is busy. Please wait until it finishes before unplugging.`)
            return
        }

        this.isPluggedIn = false
        console.log('Rice cooker unplugged.')
    }

    printMenu(): void {
        console.log('\nMenu:')
        console.log('1. Cook Rice')
        console.log('2. Warm Rice')
        console.log('3. Cancel')
        console.log('4. Add Water')
        console.log('5. Plug In')
        console.log('6. Unplug')
    }

    handleCommand(command: Commands) {
        switch (command) {
            case Commands.COOK:
                this.cookRice()
                break
            case Commands.WARM:
                this.warmRice()
                break
            case Commands.CANCEL:
                this.cancel()
                break
            case Commands.ADD_WATER:
                this.addWater()
                break
            case Commands.PLUG_IN:
                this.plugIn()
                break
            case Commands.UNPLUG:
                this.unplug()
                break
            default:
                console.log('Invalid command. Please enter a valid option.')
        }
    }
}
