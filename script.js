const playButton = document.querySelector('.stopwatch-container .counter .buttons .play-button')
const saveButton = document.querySelector('.stopwatch-container .counter .buttons .save-button')
const resetButton = document.querySelector('.stopwatch-container .counter .buttons .reset-button')
const allNumbers = document.querySelectorAll('.stopwatch-container .counter .number-wrapper .number')
const savedTimeParent = document.getElementById('saved-time')
const savedTimeContainer = document.getElementById('saved-time-container')
const savedTimeClose = document.getElementById('close-saved-time')

const daysNumber = document.querySelector('.stopwatch-container .counter .days .number')
const hoursNumber = document.querySelector('.stopwatch-container .counter .hours .number')
const minutesNumber = document.querySelector('.stopwatch-container .counter .minutes .number')
const secondsNumber = document.querySelector('.stopwatch-container .counter .seconds .number')

let timeCounts = false
let intervalId

let daysValue = 0
let hoursValue = 0
let minutesValue = 0
let secondsValue = 0

function clearTime (){
  daysValue = 0
  hoursValue = 0
  minutesValue = 0
  secondsValue = 0
}

function increaseTime (){

  if(secondsValue === 59) {
    if(minutesValue === 59){
      if(hoursValue === 23){
        daysValue++
        daysNumber.textContent = daysValue
  
        hoursValue = 0
        hoursNumber.textContent = hoursValue

        minutesValue = 0
        minutesNumber.textContent = minutesValue

        secondsValue = 0
        secondsNumber.textContent = secondsValue
        return
      }
      minutesValue = 0
      minutesNumber.textContent = minutesValue

      hoursValue++
      hoursNumber.textContent = hoursValue

      secondsValue = 0
      secondsNumber.textContent = secondsValue
      return
    }
    secondsValue = 0
    secondsNumber.textContent = secondsValue

    minutesValue++
    minutesNumber.textContent = minutesValue
    return
  } else{
    secondsValue++
    secondsNumber.textContent = secondsValue
  }
  
}

function playTime (){
  if(!timeCounts) {
    playButton.querySelector('i').classList.remove('ri-play-line')
    playButton.querySelector('i').classList.add('ri-pause-line')

    intervalId = setInterval(increaseTime, 1000)

    timeCounts = true
  } else{
    playButton.querySelector('i').classList.add('ri-play-line')
    playButton.querySelector('i').classList.remove('ri-pause-line')
    clearInterval(intervalId)
    timeCounts = false
  }
}

function resetTime (){

  allNumbers.forEach(item => {
    item.textContent = 0
  })

  clearInterval(intervalId)
  timeCounts = false

  playButton.querySelector('i').classList.add('ri-play-line')
  playButton.querySelector('i').classList.remove('ri-pause-line')

  clearTime ()
}

function saveTime (){
  if ( (daysValue || hoursValue || minutesValue || secondsValue) && timeCounts){
    if (!savedTimeParent.classList.contains('active')) {
      savedTimeParent.classList.add('active')
    }

    const li = document.createElement('li')
    li.classList.add('saved-time-item')
    li.innerHTML = `
      ${daysValue} : ${hoursValue} : ${minutesValue} : ${secondsValue}
    `
    savedTimeContainer.appendChild(li)
  }
}

function closeSavedTime (){
  if (savedTimeParent.classList.contains('active')) {
    savedTimeParent.classList.remove('active')

    savedTimeContainer.replaceChildren()
  }
}

playButton.addEventListener('click', () => {
  playTime ()
})

saveButton.addEventListener('click', () => {
  saveTime ()
})

resetButton.addEventListener('click', () => {
  resetTime ()
  closeSavedTime ()
})

savedTimeClose.addEventListener('click', () => {
  closeSavedTime ()
})