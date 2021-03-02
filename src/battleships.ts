const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class State {
    hitCoords: Array<string> = new Array()
    range: Array<string> = new Array()
    vessels: Array<Vessel> = new Array()
    rows = 10
    columns = 10
    constructor() {
        const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        col.forEach(l => {
            for(let i = 1; i < 11; i++) {
                this.range.push(l+i)
            }
        })
    }

    inRange(coord: string): boolean {
        if(this.range.includes(coord)) return true
        else return false
    }
}

export class Vessel {
    coord: Array<string>

    constructor(coords: Array<string>) {
        this.coord = coords
    }
}

export function addVessel(state: State, vessel: Vessel): State {
    let addFlag = true
    state.vessels.forEach( v => {
        if(v.coord.filter(c => vessel.coord.includes(c)).length > 0) {
            addFlag = false
        }
    })
    if(addFlag) state.vessels.push(vessel)
    return state
}

export function fire(state: State, coord: string): State {
    if(coord != "" && !state.hitCoords.includes(coord) && state.inRange(coord)) {
        state.hitCoords.push(coord)
        let hitFlag = false
        state.vessels.forEach( v => {
            const il = v.coord.length
            v.coord = v.coord.filter(c => c !== coord)
            if(v.coord.length < il) {
                hitFlag = true
                console.log("Hit")
            }
            if(v.coord.length === 0) {
                state.vessels = state.vessels.filter(s => s !== v)
                console.log("Sunk")
            }
        })
        if(!hitFlag) console.log("Miss")
    }
    return state
}

export function getVesselCoords(state: State, length: number): Array<string> {
    const coords = new Array()
    const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    if(getRandomInt(2) === 0) {
        const selectedCol = col[getRandomInt(10)]
        const startRow = getRandomInt(state.rows-length)+1
        for(let i = 0; i < length; i++) {
            coords.push(selectedCol+(startRow+i).toString())
        }
    } else {
        const selectedRow = getRandomInt(10)+1
        const startCol = getRandomInt(state.columns-length)
        for(let i = 0; i < length; i++) {
            coords.push(col[startCol+i]+selectedRow.toString())
        }
    }
    return coords
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max))
}

function play(state: State): void {
    rl.question("Enter Coordinates: ", (entered: string) => {
        fire(state, entered)
    if(state.vessels.length>0) {
        play(state)
    } else rl.close()
    })
    
}

export function init(): State {
    const state = new State()
    while(state.vessels.length < 2) {
        addVessel(state, new Vessel(getVesselCoords(state, 4)))
    }
    while(state.vessels.length < 3) {
        addVessel(state, new Vessel(getVesselCoords(state,5)))
    }
    return state
}

console.log("Battleships")
play(init())

