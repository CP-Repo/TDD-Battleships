const battleships = require("../src/battleships")

test("Fire returns a state", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    expect(battleships.fire(testState, "")).toStrictEqual(outState)
})

test("State stores coords", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    outState.hitCoords.push("A1")
    expect(battleships.fire(testState,"A1")).toStrictEqual(outState)
})

test("Fire will not add repeat coords", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    testState.hitCoords.push("A1")
    outState.hitCoords.push("A1")
    expect(battleships.fire(testState, "A1")).toStrictEqual(outState)
})

test("Fire only allows coords within range", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    expect(battleships.fire(testState, "A11")).toStrictEqual(outState)
})

test("addVessel adds a vessel to the state", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    const testVessel = new battleships.Vessel(["A1"])
    outState.vessels.push(testVessel)
    expect(battleships.addVessel(testState, testVessel)).toStrictEqual(outState)
})

test("addVessel will not add a vessel that intersects an existing vessel", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    const existingVessel = new battleships.Vessel(["A1", "A2", "A3"])
    const newVessel = new battleships.Vessel(["A1", "B1", "C1"])
    testState.vessels.push(existingVessel)
    outState.vessels.push(existingVessel)
    expect(battleships.addVessel(testState, newVessel)).toStrictEqual(outState)
})

test("getVesselCoords returns an array of coordinates of the ship length", () => {
    const testState = new battleships.State()
    expect(battleships.getVesselCoords(testState, 4).length).toEqual(4)
})

test("fire on an unoccupied square will not change the state", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    const testVessel = new battleships.Vessel(["A1", "A2", "A3"])
    outState.vessels.push(testVessel)
    outState.hitCoords.push("A4")
    testState.vessels.push(testVessel)
    expect(battleships.fire(testState, "A4")).toStrictEqual(outState)
})

test("fire on an occupied square will remove the coordinate from the vessel", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    const testVessel = new battleships.Vessel(["A1", "A2", "A3"])
    testState.vessels.push(testVessel)
    outState.vessels.push(new battleships.Vessel(["A2", "A3"]))
    outState.hitCoords.push("A1")
    expect(battleships.fire(testState, "A1")).toStrictEqual(outState)
})

test("firing on the last square of a vessel will remove it from the state", () => {
    const testState = new battleships.State()
    const outState = new battleships.State()
    testState.vessels.push(new battleships.Vessel(["A1"]))
    outState.hitCoords.push("A1")
    expect(battleships.fire(testState, "A1")).toStrictEqual(outState)
})

test("init creates a state and adds three vessels to it", () => {
    const testState = battleships.init()
    expect(testState.vessels.length).toEqual(3)
})
