let dealerSum = 0
let yourSum = 0
let lifeSpan = 150
let yearsLeft = ''


// document.getElementById ('soul-counter') = lifeSpan

let dealerAceCount = 0
let yourAceCount = 0 // keeps track of how many aces you have to add 10 or add 1 to keep you from busting

let hidden
let deck

let canHit = true // allows the the user to draw/hit while the user total sum is <= 21

window.onload = function () {
    buildDeck ()
    shuffleDeck ()
    startGame ()
    betLife()
}

function buildDeck () {
    let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']
    let types = ['C', 'D', 'H', 'S']
    deck = []
//loop through all the types first then values for each type
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push (values[j] + '-' + types[i])
        }
    }
    // console.log (deck)
}

//shuffle the deck so it would be randomized 
function shuffleDeck () {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length) 
        let temp = deck[i] // to swap em
        deck[i] = deck[j]
        deck[j] = temp
    }
    console.log (deck)
}


function startGame () {
    hidden = deck.pop () // takes out a card from the end of the array
    dealerSum += getValue (hidden) //gets the value of the card
    dealerAceCount += checkAce (hidden) // checks if its an ace
    // console.log (hidden)
    // console.log (dealerSum)


    // dealing to the dealer as long as his total sum is greater than 17
    while (dealerSum < 17) {
        let cardImg = document.createElement ('img') // created an <img> tag
        let card = deck.pop () // got card from the deck
        cardImg.src = './cards/' + card + '.png' // set the src for the img tag
        dealerSum += getValue (card) // increments the dealer sum
        dealerAceCount += checkAce (card) // checked how many aces he has using the checkAce function
        document.getElementById ('dealer-cards').append (cardImg) // appended the <img> tag to the dealer-cards
    }
    console.log (dealerSum)

    // cards for the player and creates 2 cards images
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement ('img')
        let card = deck.pop () 
        cardImg.src = './cards/' + card + '.png' 
        yourSum += getValue (card) 
        yourAceCount += checkAce (card) 
        document.getElementById('user-cards').append(cardImg) 
    }
    //print our user sum
    console.log (yourSum)
    document.getElementById ('hit').addEventListener ('click', hit) // calls on the 'hit' function giving the user a new card
    document.getElementById ('stay').addEventListener ('click', stay) // calls on the stay function letting the user end their turn with current total sum
    // document.getElementById ('reset').addEventListener ('click', resetGame)
    document.getElementById ('life').addEventListener ('click', betLife)
}

// giving the 'hit' button functionality
function hit () {
    if (!canHit) {
        return
    }

    // test
    // if (yourSum < 21) {
    //     console.log ('Want to hit again')
    // } else if (yourSum === 21) {
    //     console.log ('you have Black Jack')
    // } else if (yourSum > 21) {
    //     console.log ('YOU BUSTED')
    // }

    let cardImg = document.createElement ('img')
    let card = deck.pop () 
    cardImg.src = './cards/' + card + '.png' 
    yourSum += getValue (card) 
    yourAceCount += checkAce (card) 
    document.getElementById ('user-cards').append (cardImg) 

    // check user sum and user ace count
    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false
    }

    // let life = ''
    // if (lifeSpan === 150) {
    //     life = 'You Have a Lifespan of 150 years'
    // } else if (lifeSpan > 150) {
    //     life = `You have ${betting} years left`
    // } else if (lifeSpan == 0) {
    //     life = 'You Died!'
    // }

    // document.getElementById ('soul-counter').innerText = life
    // console.log (life)
}

function stay () {
    dealerSum = reduceAce (dealerSum, dealerAceCount)
    yourSum = reduceAce(yourSum, yourAceCount)


    canHit = false
    document.getElementById('hide').src = './cards/' + hidden + '.png' // review the hidden card


    // set winning conditions
    let message = ''
    if (yourSum > 21) {
        message = 'YOU LOSE!'
        yearsLeft = lifeSpan -= 10
    } else if (dealerSum > 21) {
        message = 'YOU WIN!'
        yearsLeft = lifeSpan += 10
    } else if (yourSum == dealerSum) {
        message = 'ITS A TIE!'
    } else if (yourSum > dealerSum) {
        message = 'YOU WIN!'
        yearsLeft = lifeSpan += 10
    } else if (yourSum < dealerSum) {
        message = 'YOU LOSE!'
        yearsLeft = lifeSpan -= 10
    }


    document.getElementById ('dealer-sum').innerText = dealerSum // put dealerSum into the ID dealer-sum <h2> tag
    document.getElementById ('user-sum').innerText = yourSum // put yourSum into the ID your-sum <h2> tag
    document.getElementById ('results').innerText = message // puts one of the messages into the ID results <p> tag
    document.getElementById ('years').innerText = yearsLeft
    console.log (yearsLeft)
}

function resetGame () {
    
}

function getValue (card) {
    let data = card.split ('-') // by calling split we calling the values ['4', 'C']
    let value = data [0]

    // Checking the value for digits
    if (isNaN(value)) {
        if (value == 'A') {
            return 11
        }
        return 10
    }
    //return w.e value the card is
    return parseInt(value)
}


function checkAce (card) {
    if (card[0] == 'A') {
        return 1
    }
    return 0
}

// reduces the aces from 11 to 1
function reduceAce (playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10
        playerAceCount -= 0
    }
    return playerSum
}

function betLife () {
    // let yearsLeft = ''

    // for (let i = 0; i < lifeSpan; i++) {
        // if (yourSum > 21) {
        //     yearsLeft = lifeSpan - 10
        // } else if (dealerSum > 21) {
        //     yearsLeft = lifeSpan + 10
        // } else if (yourSum === dealerSum) {
        //     yearsLeft = lifeSpan
        // }  else if (yourSum > dealerSum) {
        //     yearsLeft = lifeSpan + 10
        // } else if (yourSum < dealerSum) {
        //     yearsLeft = lifeSpan - 10
        // }
    // }

    // document.getElementById ('years').innerText = yearsLeft
    // console.log (yearsLeft)
}

// function startButton () {
//     document.getElementById ('start').addEventListener ('click', startGame)
//     document.getElementById ('start').toggle ('hide')
//     document.getElementById ('hit').toggle ('hide')
//     document.getElementById ('stay').toggle ('hide')
//     document.getElementById ('reset').toggle ('hide')
// }
