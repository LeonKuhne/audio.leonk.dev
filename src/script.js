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

var model = {}

const rampVolume = (tickVolume, volume, onDone=()=>{}, delay=10) => {
  if (tickVolume(model.audio.volume, volume)) {
    model.audio.volume = volume
    onDone()
    return
  }
  setTimeout(() => {
    rampVolume(tickVolume, volume, onDone, delay)
  }, delay)
}

const rampUpVolume = (volume, onDone=()=>{}, step=0.05) => {
  rampVolume((current, target) => {
    let vol = model.audio.volume + step
    vol = vol > 1 ? 1 : vol
    model.audio.volume = vol
    return current >= target
  }, volume, onDone)
}
const rampDownVolume = (volume, onDone=()=>{}, step=0.05) => {
  rampVolume((current, target) => {
    let vol = model.audio.volume - step
    vol = vol < 0 ? 0 : vol
    model.audio.volume = vol
    return current <= target
  }, volume, onDone)
}

const setActiveRecord = (elem) => {
  resetActiveRecord()
  elem.classList.add('active')
}

const resetActiveRecord = () => {
  const activeRecord = document.querySelector('.record.active')
  if (activeRecord) {
    activeRecord.classList.remove('active')
  }
}

const trackProgress = (delay=10) => {
  if (model.audio.paused) { return }
  const progress = model.audio.currentTime / model.audio.duration
  model.progress.style.height = `${progress * 100}%`
  setTimeout(() => trackProgress(delay), delay)
}

const play = (name, record, elem) => {
  setActiveRecord(elem)
  model.audio.currentTime = 0
  model.audio.altText = name
  model.audio.src = record
  model.volume = 0
  model.audio.play()
  rampUpVolume(1)
  trackProgress()
}

const pause = () => {
  resetActiveRecord()
  rampDownVolume(0, () => model.audio.pause())
}

const addRecord = (name, record, elem) => {
  const recordElem = document.createElement('div')
  recordElem.className = 'record'
  recordElem.innerHTML = `<h2>${name}</h2>`
  recordElem.addEventListener('click', () => {
    // pause record
    if (model.audio.altText == name && !model.audio.paused) {
      pause()
    // play record
    } else {
      play(name, record, recordElem)
    }
  })
  // render record
  elem.appendChild(recordElem)
}

const addGroup = (name, group, elem) => {
  // add group
  const groupElem = document.createElement('div')
  groupElem.className = 'group'
  groupElem.innerHTML = `<h1>${name}</h1>`
  elem.appendChild(groupElem)
  // add more groups and records
  for (let [name, childGroup] of Object.entries(group)) {
    if (typeof childGroup === 'string') {
      addRecord(name, childGroup, groupElem)
    } else {
      addGroup(name, childGroup, groupElem)
    }
  }
}


// start
window.onload = () => {
  model = {
    audio: new Audio(volume=0),
    progress: document.getElementById('progress'),
    waves: document.getElementById('waves'),
  }
  // display records from shelf
  addGroup("waves", shelf, model.waves)
}