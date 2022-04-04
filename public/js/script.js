const title = document.getElementById('title')
const timeNLang = document.getElementById('timeNLang')
const paragraph = document.querySelector('#paragraph p')
const inputField = document.getElementById('inputField')
const beforeStart = document.getElementById('beforeStart')
const result = document.querySelectorAll('#paragraph table tr td span')
const reloadButton = document.querySelector('#reload a')

let randomText =paragraphs[Math.floor(Math.random()*paragraphs.length)]
let animateTitleIndex = 0
let splitNow = 0
let hasClick = false
let time = 30
let timeInterval 
let correctWords = 0
let wrongtWords = 0
let timePlay = 0

function animateTitleChange() {
    let animateTitleSpan = title.querySelectorAll('span')
    animateTitleSpan.forEach(function (animateTitleSpan) {
        animateTitleSpan.classList.remove('text-red-500')
        animateTitleSpan.classList.remove('underline')
    })
    if (animateTitleIndex == 0) {
        animateTitleSpan.forEach(function (animateTitleSpan) {
            animateTitleSpan.classList.remove('text-red-500')
            animateTitleSpan.classList.remove('underline')
        })
    }
    if (animateTitleIndex <= animateTitleSpan.length-1 && animateTitleIndex != 0) {
        animateTitleSpan[animateTitleIndex-1].classList.add('text-red-500')
        animateTitleSpan[animateTitleIndex-1].classList.add('underline')
    }
    if (animateTitleIndex == animateTitleSpan.length) {
        animateTitleSpan.forEach(function (animateTitleSpan) {
            animateTitleSpan.classList.add('text-red-500')
            animateTitleSpan.classList.add('underline')
        })
        animateTitleIndex = 0
    }else{
        animateTitleIndex++
    }
}

function animateTitle() {
    let animateTitle = title.textContent.split("")
    title.innerHTML = ''
    animateTitle.forEach(function (animateTitleSpan) {
        title.innerHTML += `<span>`+animateTitleSpan+`</span>`
    })
    let animateTitleSpan = title.querySelectorAll('span')
    animateTitleSpan.forEach(function (animateTitleSpan) {
        animateTitleSpan.classList.add('transition')
    })
    setInterval(animateTitleChange, 450)
}

animateTitle()

function innerParagraph() {
    let paragraphSplit = randomText.split("")
    paragraphSplit.forEach(function (spanSplit) {
        paragraph.innerHTML += `<span>`+spanSplit+`</span>`
    })
}

beforeStart.addEventListener('click', function (e) {
    inputField.focus()
    paragraph.querySelectorAll('span')[splitNow].classList.add('border-l-2')
    paragraph.querySelectorAll('span')[splitNow].classList.add('border-red-500')
    paragraph.querySelectorAll('span')[splitNow].classList.add('animate-borderBlink')
    beforeStart.classList.add('invisible')
    paragraph.classList.replace('opacity-40','opacity-100')
})

paragraph.addEventListener('click', function () {
    inputField.focus()
    let paragraphSpanSplit = paragraph.querySelectorAll('span')
    paragraphSpanSplit[splitNow].classList.add('border-l-2')
    paragraphSpanSplit[splitNow].classList.add('border-red-500')
    paragraphSpanSplit[splitNow].classList.add('animate-borderBlink')
})

function resultWPM() {
    if (time <= 30) {
        timePlay = 0.5
    }
    paragraph.querySelectorAll('span').forEach(function (spanCheck) {
        if(spanCheck.className === 'text-black') {
            correctWords++
        }
    })
    result[0].parentElement.parentElement.parentElement.parentElement.classList.remove('hidden')
    result[0].innerHTML = Math.round((correctWords/5)/timePlay)
    result[1].innerHTML = Math.round((correctWords-wrongtWords)/correctWords*100)+'%'
    result[2].innerHTML = 'time 30 English'
}

function timestamp() {
    time--
    timeNLang.querySelector('a').classList.add('hidden')
    timeNLang.querySelector('span').classList.remove('hidden')
    timeNLang.querySelector('span').innerHTML = time
    if (time == 0) {
        clearInterval(timeInterval)
        paragraph.classList.add('hidden')
        resultWPM()
    }
}

function correctingInput() {
    if (hasClick == false) {
        timeNLang.querySelector('span').innerHTML = time
        timeNLang.querySelector('span').classList.remove('hidden')
        timeNLang.querySelector('a').classList.add('hidden')
        timeInterval = setInterval(timestamp, 1000)
        hasClick = true
    }
    let paragraphSpanSplit = paragraph.querySelectorAll('span')
    let inputSplit = inputField.value.split("")[splitNow]
    if (inputSplit == null) {
        splitNow--
        paragraphSpanSplit[splitNow].classList.remove('bg-red-500/30')
        paragraphSpanSplit[splitNow].classList.remove('text-red-500')
        paragraphSpanSplit[splitNow].classList.remove('text-black')

    }else{
        if (paragraphSpanSplit[splitNow].textContent === inputSplit) {
            paragraphSpanSplit[splitNow].classList.add('text-black')
        }else{
            paragraphSpanSplit[splitNow].classList.add('bg-red-500/30')
            paragraphSpanSplit[splitNow].classList.add('text-red-500')
            wrongtWords++
        }
        splitNow++
    }
    paragraphSpanSplit.forEach(function (removeBorderBottom) {
        removeBorderBottom.classList.remove('border-l-2')
        removeBorderBottom.classList.remove('border-red-500')
        removeBorderBottom.classList.remove('animate-borderBlink')
    }) 
    paragraphSpanSplit[splitNow].classList.add('border-l-2')
    paragraphSpanSplit[splitNow].classList.add('border-red-500')
    paragraphSpanSplit[splitNow].classList.add('animate-borderBlink')
}
innerParagraph()
inputField.addEventListener('input',correctingInput)

reloadButton.addEventListener('click', function (e) {
    e.preventDefault()
    animateTitleIndex = 0
    splitNow = 0
    hasClick = false
    time = 30
    correctWords = 0
    wrongtWords = 0
    timePlay = 0
    timeNLang.querySelector('span').classList.add('hidden')
    timeNLang.querySelector('a').classList.remove('hidden')
    result[0].parentElement.parentElement.parentElement.parentElement.classList.add('hidden')
    paragraph.classList.remove('hidden')
    clearInterval(timeInterval)
    paragraph.querySelectorAll('span').forEach(function (paragraphReload) {
        randomText =paragraphs[Math.floor(Math.random()*paragraphs.length)]
        paragraphReload.classList.remove('bg-red-500/30')
        paragraphReload.classList.remove('text-red-500')
        paragraphReload.classList.remove('border-l-2')
        paragraphReload.classList.remove('border-red-500')
        paragraphReload.classList.remove('animate-borderBlink')
        paragraphReload.classList.remove('text-black')
    })
    paragraph.innerHTML = ''
    innerParagraph()
    inputField.value = ''
})