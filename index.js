// saving the elements from the DOM to variables for easy look ups
const gameBoard = document.querySelector('#game-board')
const button = document.querySelector('button')
const heros = [
	{
		health: 30,
		attack: 10,
		name: 'Fighter',
	},
	{
		health: 20,
		attack: 20,
		name: 'Rouge',
	},
	{
		health: 10,
		attack: 30,
		name: 'Mage',
	},
]
let createdUnits = []

class Unit {
    constructor(health, attack, name) {
        this.health = health
        this.attack = attack
        this.name = name
    }

    // to check if this unit is alive
    isAlive () {
        return this.health > 0
    }

    // incomingDamage is a param
    // unit.takeDamage(anotherUnits.attack)
    takeDamage (incomingDamage) {
        this.health = this.health - incomingDamage
        return this.health
    }
}

const shuffleUnits = (units) => {
    for (let i = units.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1))
            let temp = units[i]
            units[i] = units[j]
            units[j] = temp
	}
    return units
}

const createUnits = (unitArray) => {
    // forEach hero `i`
    unitArray.forEach(hero => {
        const playerUnit = new Unit(hero.health, hero.attack, hero.name)

        createdUnits.push(playerUnit)
        const div = document.createElement('div')
        div.classList.add('unit')
        div.innerHTML = `
            <p>${playerUnit.name}</p>
            <p>${playerUnit.health}</p>
        `
        gameBoard.appendChild(div)
    })

    const dragon = new Unit(100, 20, 'Dragon')
    const div = document.createElement('div')
    div.classList.add('unit')
    div.innerHTML = `
        <p>${dragon.name}</p>
        <p>${dragon.health}</p>
    `
    createdUnits.push(dragon)
    gameBoard.appendChild(div)
}

const renderDamage = () => {
    const units = document.querySelectorAll('.unit')
    const dragon = createdUnits.filter(unit => unit.name === 'Dragon')
    const mage = createdUnits.filter(unit => unit.name === 'Mage')
    const fighter = createdUnits.filter((unit) => unit.name === 'Fighter')
    const rouge = createdUnits.filter((unit) => unit.name === 'Rouge')

    units[0].innerHTML = `
        <p>${fighter[0].name}</p>
        <p>${fighter[0].health}</p>
    `
    units[1].innerHTML = `
        <p>${rouge[0].name}</p>
        <p>${rouge[0].health}</p>
    `
    units[2].innerHTML = `
        <p>${mage[0].name}</p>
        <p>${mage[0].health}</p>
    `
    units[3].innerHTML = `
        <p>${dragon[0].name}</p>
        <p>${dragon[0].health}</p>
    `
}

// running game set up
initialize()

// function to call any other functions to set up the game
function initialize() {
    createUnits(heros)
}

// button to start game play
button.addEventListener('click', () => {
	console.log('Playing game...')
    const shuffledUnits = shuffleUnits(createdUnits)

    const dragon = createdUnits.filter(unit => unit.name === 'Dragon')
    const mage = createdUnits.filter(unit => unit.name === 'Mage')
    const fighter = createdUnits.filter((unit) => unit.name === 'Fighter')
    const rouge = createdUnits.filter((unit) => unit.name === 'Rouge')

    const isPlayerUnitsAlive = 
        mage[0].isAlive() ||
        fighter[0].isAlive() ||
        rouge[0].isAlive()

    if (dragon[0].isAlive() && isPlayerUnitsAlive) {
        shuffledUnits.forEach(unit => {
        if (unit.name !== 'Dragon') {
            dragon[0].takeDamage(unit.attack)
        } else {
            const randomIndex = Math.floor(Math.random() * 4)
            if (shuffledUnits[randomIndex].name !== 'Dragon') {
                const foundUnit = createdUnits.filter(unit => unit.name === `${shuffledUnits[randomIndex].name}`)
                foundUnit[0].takeDamage(dragon[0].attack)
            }
        }
    })
    }
    renderDamage()
})
