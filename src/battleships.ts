export class State {
    coord: Array<string> = new Array()
    range: Array<string> = new Array()
    vessels: Array<Vessel> = new Array()
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
    if(coord != "" && !state.coord.includes(coord) && state.inRange(coord)) {
        state.coord.push(coord)
        state.vessels.forEach( v => {
            v.coord = v.coord.filter(c => c !== coord)
        })
    }
    return state
}



