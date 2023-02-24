const shelf = {
  // [autofill ./audio] add '/' to rebuild
  "albums": {
    "get real headphones": {
      "buy me coffee": "./audio/albums/get real headphones/buy me coffee.mp3",
      "buy my synths": "./audio/albums/get real headphones/buy my synths.mp3",
      "leave my girlfriend": "./audio/albums/get real headphones/leave my girlfriend.mp3",
      "take my nightmares": "./audio/albums/get real headphones/take my nightmares.mp3",
    },
  },
  "unsorted": {
    "bad request v3": "./audio/unsorted/bad request v3.mp3",
    "method a": "./audio/unsorted/method a.mp3",
    "tree": "./audio/unsorted/tree.mp3",
  },
}

const audio = new Audio()

const rampVolume = (tickVolume, audio, volume, onDone=()=>{}, delay=10) => {
  if (tickVolume(audio.volume, volume)) {
    audio.volume = volume
    onDone()
    return
  }
  setTimeout(() => {
    rampVolume(tickVolume, audio, volume, onDone, delay)
  }, delay)
}

const rampUpVolume = (audio, volume, onDone=()=>{}, step=0.05) => {
  rampVolume((current, target) => {
    let vol = audio.volume + step
    vol = vol > 1 ? 1 : vol
    audio.volume = vol
    return current >= target
  }, audio, volume, onDone)
}
const rampDownVolume = (audio, volume, onDone=()=>{}, step=0.05) => {
  rampVolume((current, target) => {
    let vol = audio.volume - step
    vol = vol < 0 ? 0 : vol
    audio.volume = vol
    return current <= target
  }, audio, volume, onDone)
}

const setActiveRecord = (recordElem) => {
  resetActiveRecord()
  recordElem.classList.add('active')
}

const resetActiveRecord = () => {
  const activeRecord = document.querySelector('.record.active')
  if (activeRecord) {
    activeRecord.classList.remove('active')
  }
}

const play = (name) => {
  setActiveRecord(recordElem)
  audio.currentTime = 0
  audio.altText = name
  audio.src = record
  audio.play()
  rampUpVolume(audio, 1)
}

const pause = () => {
  resetActiveRecord()
  rampDownVolume(audio, 0, () => {
    audio.pause()
  })
}

const addRecord = (name, elem, record) => {
  const recordElem = document.createElement('div')
  recordElem.className = 'record'
  recordElem.innerHTML = `<h2>${name}</h2>`
  recordElem.addEventListener('click', () => {
    // pause record
    if (audio.altText == name && !audio.paused) {
      pause()
    // play record
    } else {
      play()
    }
  })
  // render record
  elem.appendChild(recordElem)
}

const addGroup = (name, elem, group) => {
  // add group
  const groupElem = document.createElement('div')
  groupElem.className = 'group'
  groupElem.innerHTML = `<h1>${name}</h1>`
  elem.appendChild(groupElem)
  // add more groups and records
  for (let [name, childGroup] of Object.entries(group)) {
    if (typeof childGroup === 'string') {
      addRecord(name, groupElem, childGroup)
    } else {
      addGroup(name, groupElem, childGroup)
    }
  }
}


// start
window.onload = () => {
  // display records from shelf
  addGroup("waves", document.getElementById('waves'), shelf)
}