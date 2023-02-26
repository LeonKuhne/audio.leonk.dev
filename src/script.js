const shelf = {
  // [autofill ./audio] add '/' to rebuild
  "waves": {
    "get real headphones": {
      "buy me coffee": "./audio/waves/get real headphones/buy me coffee.mp3",
      "take my nightmares": "./audio/waves/get real headphones/take my nightmares.mp3",
      "buy my synths": "./audio/waves/get real headphones/buy my synths.mp3",
      "leave my girlfriend": "./audio/waves/get real headphones/leave my girlfriend.mp3",
    },
    "hell": {
      "water pipe thing": "./audio/waves/hell/water pipe thing.mp3",
      "eight": "./audio/waves/hell/8.mp3",
      "beaps": "./audio/waves/hell/beaps.mp3",
      "calm and enjoyable": "./audio/waves/hell/calm _ enjoyable.mp3",
      "aliens are real": "./audio/waves/hell/aliens are real.mp3",
      "clown trauma": "./audio/waves/hell/clown trauma.mp3",
      "climb": "./audio/waves/hell/STDeez Nuts.mp3",
      "full climb": "./audio/waves/hell/STDeez Removal.mp3",
      "pop style": "./audio/waves/hell/pop style.mp3",
      "a way in": "./audio/waves/hell/a way in.mp3",
    },
    "LA": {
      "too lazy to make more coffee": "./audio/waves/LA/too lazy to make more coffee.mp3",
      "what i want": "./audio/waves/LA/what i want.mp3",
      "she liked this one": "./audio/waves/LA/she liked this one.mp3",
      "trips": "./audio/waves/LA/trips.mp3",
      "pay attention": "./audio/waves/LA/pay attention.mp3",
    },
    "for me": {
      "witness me": "./audio/waves/for me/witness me.mp3",
      "only good things": "./audio/waves/for me/only good things.mp3",
      "isolation": "./audio/waves/for me/isolation.mp3",
      "only": "./audio/waves/for me/only.mp3",
    },
    "dtkm": {
      "Hey Everybody!": "./audio/waves/dtkm/Hey Everybody!.mp3",
      "Rules of the Game": "./audio/waves/dtkm/Rules of the Game.mp3",
      "Fuck Rules": "./audio/waves/dtkm/Fuck Rules.mp3",
      "Phat Dix": "./audio/waves/dtkm/Phat Dix.mp3",
      "Siva": "./audio/waves/dtkm/Siva.mp3",
    },
    "unreleased": {
      "Insert 20": "./audio/waves/unreleased/Insert 20.mp3",
      "Tamagochi": "./audio/waves/unreleased/Tamagochi.mp3",
      "Uncanny Valley": "./audio/waves/unreleased/Uncanny Valley.mp3",
      "fu spenny": "./audio/waves/unreleased/fuck you spenny.mp3",
      "mud": "./audio/waves/unreleased/mud.mp3",
      "ramadan": "./audio/waves/unreleased/ramadan.mp3",
      "samureye swards": "./audio/waves/unreleased/samureye swards.mp3",
      "song with bass": "./audio/waves/unreleased/song with bass.mp3",
      "trap house": "./audio/waves/unreleased/trap house.mp3",
    },
    "gems": {
      "It_s been a": "./audio/waves/gems/It_s been a.mp3",
      "Straight Lines w: J": "./audio/waves/gems/Straight Lines w: J.mp3",
      "bad request v3": "./audio/waves/gems/bad request v3.mp3",
      "notsuperdrunk": "./audio/waves/gems/leonsnotsuperdrunk.mp3",
      "piano and bass": "./audio/waves/gems/piano and bass.mp3",
      "ramadan edit": "./audio/waves/gems/ramadan edit.mp3",
    },
  },
  "lib": {
    "needs work": {
      "Bad Manners": "./audio/lib/needs work/Bad Manners.mp3",
      "a nice song": "./audio/lib/needs work/a nice song.mp3",
      "future": "./audio/lib/needs work/future.mp3",
      "gogogo": "./audio/lib/needs work/gogogo.mp3",
      "help": "./audio/lib/needs work/help.mp3",
    },
    "old": {
      "45 min": "./audio/lib/old/45 min.mp3",
      "I had a good week without you": "./audio/lib/old/I had a good week without you.mp3",
      "angry": "./audio/lib/old/angry.mp3",
      "constipated": "./audio/lib/old/constipated.mp3",
      "future": "./audio/lib/old/future.mp3",
    },
    "practice": {
      "7": "./audio/lib/practice/7.mp3",
      "Notorious Mike": "./audio/lib/practice/Notorious Mike.mp3",
      "back": "./audio/lib/practice/back.mp3",
      "method a": "./audio/lib/practice/method a.mp3",
      "percs": "./audio/lib/practice/percs.mp3",
      "song": "./audio/lib/practice/song.mp3",
    },
    "stems": {
      "COME TOGETHER": "./audio/lib/stems/COME TOGETHER.mp3",
      "I had a": "./audio/lib/stems/I had a.mp3",
      "I_m a sheeple": "./audio/lib/stems/I_m a sheeple.mp3",
      "I_m afraid I have to run": "./audio/lib/stems/I_m afraid I have to run.mp3",
      "Me": "./audio/lib/stems/Me.mp3",
      "aeouth": "./audio/lib/stems/aeouth.mp3",
      "drown": "./audio/lib/stems/drown.mp3",
      "garage": "./audio/lib/stems/garage.mp3",
      "horn": "./audio/lib/stems/horn.mp3",
      "me pick me me": "./audio/lib/stems/me pick me me.mp3",
      "one song": "./audio/lib/stems/one song.mp3",
      "royal garbage": "./audio/lib/stems/royal garbage.mp3",
      "trap": "./audio/lib/stems/trap.mp3",
      "tree": "./audio/lib/stems/tree.mp3",
      "what if its you.": "./audio/lib/stems/what if its you..mp3",
    },
    "hidden": {
      "Gregernano": "./audio/lib/text/Gregernano.mp3",
      "How to make a &nbsp;rap song": "./audio/lib/text/How to make a   rap song.mp3",
      "abc": "./audio/lib/text/abc.mp3",
      "help2": "./audio/lib/text/help2.mp3",
      "tacobell": "./audio/lib/text/tacobell.mp3",
      "wendys": "./audio/lib/text/wendys.mp3",
    },
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
  const barBox = document.createElement('div')
  barBox.className = 'progress-box'
  const bar = document.createElement('div')
  bar.className = 'progress'
  barBox.appendChild(bar)
  elem.appendChild(barBox)
  trackProgress(bar)
}

const resetActiveRecord = () => {
  const activeRecord = document.querySelector('.record.active')
  if (activeRecord) {
    activeRecord.classList.remove('active')
    // remove progress bar
    activeRecord.querySelectorAll('.progress-box').forEach((elem) => {
      elem.parentNode.removeChild(elem)
    })
  }
}

const trackProgress = (elem, delay=10) => {
  if (model.audio.paused) { return }
  const progress = model.audio.currentTime / model.audio.duration
  elem.style.width = `${progress * 100}%`
  setTimeout(() => trackProgress(elem, delay), delay)
}

const play = (name, record, elem) => {
  model.audio.currentTime = 0
  model.audio.altText = name
  model.audio.src = record
  model.volume = 0
  model.audio.play()
  setActiveRecord(elem)
  rampUpVolume(1)
}

const pause = () => {
  resetActiveRecord()
  rampDownVolume(0, () => model.audio.pause())
}

const addRecord = (name, record, elem) => {
  const recordElem = document.createElement('div')
  recordElem.className = 'record'
  recordElem.innerHTML = `<h2>${name}</h2>`
  recordElem.querySelector('h2')
    .addEventListener('click', () => {
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
  // prepare droup elem
  let groupElem = null
  if (!name) { groupElem = elem }
  else {
    groupElem = document.createElement('div')
    groupElem.innerHTML = `<h1>${name}</h1>`
    elem.appendChild(groupElem)
    groupElem.id = name
    groupElem.className = 'hidden'
  }
  groupElem.classList.add('group')
  // recurse remaining groups/records
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
    waves: document.getElementById('audio'),
  }
  // display records from shelf
  addGroup(null, shelf, model.waves)
  // show these
  document.getElementById('waves').classList.remove('hidden')
  document.getElementById('get real headphones').classList.remove('hidden')
  // toggle groups
  for (let group of document.querySelectorAll('.group')) {
    if (group.firstChild.tagName !== 'H1') { continue }
    group.firstChild.addEventListener('click', (e) => {
      e.preventDefault()
      group.classList.toggle('hidden')
      if (!group.classList.contains('hidden')) {
        group.scrollIntoView({behavior: 'smooth'})
      }
      return false
    })
  }
}
