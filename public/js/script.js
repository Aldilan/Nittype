const paragraph = document.querySelector('#paragraph p')
const inputField = document.getElementById('inputField')
const beforeStart = document.getElementById('beforeStart')

let splitNow = 0
let time = 30

function innerParagraph() {
    let paragraphIndex = paragraphs[Math.floor(Math.random()*paragraphs.length)]
    let paragraphSplit = paragraphIndex.split("")
    paragraphSplit.forEach(function (spanSplit) {
        paragraph.innerHTML += `<span>`+spanSplit+`</span>`
    })
}

beforeStart.addEventListener('click', function (e) {
    inputField.focus()
    paragraph.querySelectorAll('span')[splitNow].classList.add('border-l-2')
    paragraph.querySelectorAll('span')[splitNow].classList.add('border-red-500')
    paragraph.querySelectorAll('span')[splitNow].classList.add('animate-blink')
    beforeStart.classList.add('invisible')
    paragraph.classList.replace('opacity-5','opacity-100')
})

function correctingInput() {
    let paragraphSpanSplit = paragraph.querySelectorAll('span')
    let inputSplit = inputField.value.split("")[splitNow]
    console.log(inputSplit)
    console.log(splitNow)
    if (inputSplit == null) {
        splitNow--
        paragraphSpanSplit[splitNow].classList.remove('text-red-500')
        paragraphSpanSplit[splitNow].classList.remove('text-black')

    }else{
        if (paragraphSpanSplit[splitNow].textContent === inputSplit) {
            paragraphSpanSplit[splitNow].classList.add('text-black')
        }else{
            console.log('asu')
            paragraphSpanSplit[splitNow].classList.add('text-red-500')
        }
        splitNow++
    }
    paragraphSpanSplit.forEach(function (removeBorderBottom) {
        removeBorderBottom.classList.remove('border-l-2')
        removeBorderBottom.classList.remove('border-red-500')
        removeBorderBottom.classList.remove('animate-blink')
    }) 
    paragraphSpanSplit[splitNow].classList.add('border-l-2')
    paragraphSpanSplit[splitNow].classList.add('border-red-500')
    paragraphSpanSplit[splitNow].classList.add('animate-blink')
    console.log(splitNow)
}
innerParagraph()
inputField.addEventListener('input',correctingInput)