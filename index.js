// saving the elements from the DOM to variables for easy look ups
const gameBoard = document.querySelector('#game-board')
const button = document.querySelector('#play-game')
const messageBoard = document.querySelector('#message-board')
const startGameButton = document.querySelector('#start-game')
const landingContainer = document.querySelector('.landing-container')
const gameBoardContainer = document.querySelector('.game-board-container')
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
	isAlive() {
		return this.health > 0
	}

	// incomingDamage is a param
	// unit.takeDamage(anotherUnits.attack)
	takeDamage(incomingDamage) {
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
	unitArray.forEach((hero) => {
		const playerUnit = new Unit(hero.health, hero.attack, hero.name)

		createdUnits.push(playerUnit)

        let playerUnitIcon

        if (playerUnit.name === 'Fighter') playerUnitIcon = `<i class="fa-solid fa-user-ninja"></i>`
        if (playerUnit.name === 'Mage') playerUnitIcon = `<i class="fa-solid fa-wand-magic"></i>`
        if (playerUnit.name === 'Rouge') playerUnitIcon = `<i class="fa-solid fa-mask"></i>`

		const div = document.createElement('div')
		div.classList.add('unit')
		div.innerHTML = `
            ${playerUnitIcon}
            <p>${playerUnit.name}</p>
            <p>${playerUnit.health}</p>
        `
		gameBoard.appendChild(div)
	})

	const dragon = new Unit(100, 20, 'Dragon')
	const div = document.createElement('div')
	div.classList.add('unit', 'dragon')
	div.innerHTML = `
        <i class="fa-solid fa-dragon"></i>
        <p>${dragon.name}</p>
        <p>${dragon.health}</p>
    `
	createdUnits.push(dragon)
	gameBoard.appendChild(div)
}

const renderDamage = () => {
	const units = document.querySelectorAll('.unit')
	const dragon = createdUnits.filter((unit) => unit.name === 'Dragon')
	const mage = createdUnits.filter((unit) => unit.name === 'Mage')
	const fighter = createdUnits.filter((unit) => unit.name === 'Fighter')
	const rouge = createdUnits.filter((unit) => unit.name === 'Rouge')

    if (fighter[0].isAlive()) {
        units[0].innerHTML = `
        <i class="fa-solid fa-user-ninja"></i>
        <p>${fighter[0].name}</p>
        <p>${fighter[0].health}</p>
    `
    } else {
        units[0].innerHTML = `
        <i class="fa-solid fa-skull"></i>
        <p>${fighter[0].name}</p>
        <p>${fighter[0].health}</p>
        `
    }

    if (rouge[0].isAlive()) {
        units[1].innerHTML = `
        <i class="fa-solid fa-mask"></i>
        <p>${rouge[0].name}</p>
        <p>${rouge[0].health}</p>
    `
    } else {
        units[1].innerHTML = `
        <i class="fa-solid fa-skull"></i>
        <p>${rouge[0].name}</p>
        <p>${rouge[0].health}</p>
    `
    }

    if (mage[0].isAlive()) {
        units[2].innerHTML = `
        <i class="fa-solid fa-wand-magic"></i>
        <p>${mage[0].name}</p>
        <p>${mage[0].health}</p>
    `
    } else {
        units[2].innerHTML = `
        <i class="fa-solid fa-skull"></i>
        <p>${mage[0].name}</p>
        <p>${mage[0].health}</p>
    `
    }

	if (dragon[0].isAlive()) {
		units[3].innerHTML = `
			    <i class="fa-solid fa-dragon"></i>
			    <p>${dragon[0].name}</p>
			    <p>${dragon[0].health}</p>
			`
	} else {
		units[3].innerHTML = `
		    <i class="fa-solid fa-skull"></i>
		    <p>${dragon[0].name}</p>
		    <p>${dragon[0].health}</p>
		`
	}
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

	const dragon = createdUnits.filter((unit) => unit.name === 'Dragon')
	const mage = createdUnits.filter((unit) => unit.name === 'Mage')
	const fighter = createdUnits.filter((unit) => unit.name === 'Fighter')
	const rouge = createdUnits.filter((unit) => unit.name === 'Rouge')

	const isPlayerUnitsAlive =
		mage[0].isAlive() || fighter[0].isAlive() || rouge[0].isAlive()

	if (dragon[0].isAlive() && isPlayerUnitsAlive) {
		shuffledUnits.forEach((unit) => {
			if (unit.name !== 'Dragon') {
				dragon[0].takeDamage(unit.attack)
			} else {
				const randomIndex = Math.floor(Math.random() * 4)
				if (shuffledUnits[randomIndex].name !== 'Dragon') {
					const foundUnit = createdUnits.filter(
						(unit) => unit.name === `${shuffledUnits[randomIndex].name}`
					)
					foundUnit[0].takeDamage(dragon[0].attack)
				}
			}
		})
	}

    if (!dragon[0].isAlive() && isPlayerUnitsAlive) {
        messageBoard.innerText = 'You won the game!!!! WOOO'
    }
	renderDamage()
})

startGameButton.addEventListener('click', () => {
    landingContainer.classList.add('hide')
    gameBoardContainer.classList.remove('hide')
})
