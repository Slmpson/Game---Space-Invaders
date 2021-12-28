const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
const menu = document.querySelector('.menu')
const nextLevelBtn = document.querySelector('.nextLevelBtn')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0
let speed = 0.9
let intervalTime = 600
let currentIntervalTime

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
]


const draw = () => {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

const startGame = () => {

  resultsDisplay.style.visibility = "visible"
  menu.parentNode.removeChild(menu)
  let intervalTime = 600

  draw()

  const moveInvaders = () => {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if (rightEdge && goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width + 1
        direction = -1
        goingRight = false
      }
    }

    if (leftEdge && !goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width - 1
        direction = 1
        goingRight = true
      }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += direction
    }

    draw()

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
      document.removeEventListener('keydown', moveShooter)
      document.removeEventListener('keydown', shoot)
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] > (squares.length)) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
        document.removeEventListener('keydown', moveShooter)
        document.removeEventListener('keydown', shoot)
      }
    }
    if (aliensRemoved.length === alienInvaders.length) {
      resultsDisplay.innerHTML = 'YOU WIN!'
      clearInterval(invadersId)
      document.removeEventListener('keydown', moveShooter)
      document.removeEventListener('keydown', shoot)
      nextLevelBtn.style.display = "inline"
    }
  }

  const remove = () => {
    for (let i = 0; i < alienInvaders.length; i++) {
      squares[alienInvaders[i]].classList.remove('invader')
    }
  }

  squares[currentShooterIndex].classList.add('shooter')


  const moveShooter = (e) => {
    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.key) {
      case 'ArrowLeft':
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
        break
      case 'ArrowRight':
        if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
        break
    }
    squares[currentShooterIndex].classList.add('shooter')
  }

  document.addEventListener('keydown', moveShooter)

  invadersId = setInterval(moveInvaders, intervalTime)


  const shoot = (e) => {
    let laserId
    let currentLaserIndex = currentShooterIndex


    const moveLaser = () => {
      if (currentLaserIndex >= 0) {
        if (squares[currentLaserIndex].classList.contains('laser')) {
          squares[currentLaserIndex].classList.remove('laser')
        }
        currentLaserIndex -= width
        if (currentLaserIndex >= 0) {
          squares[currentLaserIndex].classList.add('laser')

          if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)

            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results
            console.log(aliensRemoved)
          }

        }
      } else {
        clearInterval(laserId)
      }



    }
    switch (e.key) {
      case 'ArrowUp':
        laserId = setInterval(moveLaser, 100)

    }
  }

  document.addEventListener('keydown', shoot)

}

// Next Level Button
const nextLevel = () => {

  currentIntervalTime = intervalTime
  intervalTime = currentIntervalTime * speed

  let aliensRemoved = []
  nextLevelBtn.style.display = "none"
  let goingRight = true
  let direction = 1
  resultsDisplay.innerHTML = results

  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  ]

  const draw = () => {
    for (let i = 0; i < alienInvaders.length; i++) {
      if (!aliensRemoved.includes(i)) {
        squares[alienInvaders[i]].classList.add('invader')
      }
    }
  }


  draw()

  const moveInvaders = () => {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if (rightEdge && goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width + 1
        direction = -1
        goingRight = false
      }
    }

    if (leftEdge && !goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width - 1
        direction = 1
        goingRight = true
      }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += direction
    }

    draw()

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] > (squares.length)) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
      }
    }
    if (aliensRemoved.length === alienInvaders.length) {
      resultsDisplay.innerHTML = 'YOU WIN!'
      clearInterval(invadersId)
      document.removeEventListener('keydown', moveShooter)
      document.removeEventListener('keydown', shoot)
      nextLevelBtn.style.display = "inline"
    }
  }

  const remove = () => {
    for (let i = 0; i < alienInvaders.length; i++) {
      squares[alienInvaders[i]].classList.remove('invader')
    }
  }

  squares[currentShooterIndex].classList.add('shooter')


  const moveShooter = (e) => {
    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.key) {
      case 'ArrowLeft':
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
        break
      case 'ArrowRight':
        if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
        break
    }
    squares[currentShooterIndex].classList.add('shooter')
  }

  document.addEventListener('keydown', moveShooter)

  invadersId = setInterval(moveInvaders, intervalTime)


  const shoot = (e) => {
    let laserId
    let currentLaserIndex = currentShooterIndex
    const moveLaser = () => {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')

      if (squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')

        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
        clearInterval(laserId)

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
        aliensRemoved.push(alienRemoved)
        results++
        resultsDisplay.innerHTML = results
        console.log(aliensRemoved)

      }

    }
    switch (e.key) {
      case 'ArrowUp':
        laserId = setInterval(moveLaser, 100)
    }
  }

  document.addEventListener('keydown', shoot)
}

