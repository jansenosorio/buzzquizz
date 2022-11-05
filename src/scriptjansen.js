// Validation Pages Functions
// Global Var
let inTitle = ''
let inUrl = ''
let inNumberQuestions = ''
let inNumberLevels = ''
let btCreateQuestions = ''
let containerScreen31 = ''
let containerScreen32 = ''
let creatYourQuestions = ''
let textQuestion = ''
let hexadecimal = ''
let inUrl32 = ''
let correctAnswer = ''
let incorrectAnswer = ''

function getElementsFromHtml() {
  // get elements from html
  containerScreen31 = document.querySelector('.container-page-3-1')
  containerScreen32 = document.querySelector('.container-page-3-2')
  creatYourQuestions = document.querySelector('.create-your-questions')

  // Get input elements from HTML
  inTitle = document.querySelector('.in-title').value
  inUrl = document.querySelector('.in-url').value
  inNumberQuestions = Number(
    document.querySelector('.in-number-questions').value
  )
  inNumberLevels = Number(document.querySelector('.in-number-levels').value)
  textQuestion = document.querySelectorAll('.in-title-question')
  hexadecimal = document.querySelectorAll('.in-background-question')
  correctAnswer = document.querySelectorAll('.in-correct-answer')
  incorrectAnswer = document.querySelectorAll('.in-incorrect-answer')
  inUrl32 = document.querySelectorAll('.in-url-img')

  // Get buttons
  btCreateQuestions = document.querySelector('.bt-create-questions')

  // Add EventListener to Button
  btCreateQuestions.addEventListener('click', validationIputData31)
}

getElementsFromHtml()

// Function to validation input data page 3.1, if it is ok, go to next page
function validationIputData31() {
  getElementsFromHtml()

  if (
    checkTitleNumbers(inTitle) === true &&
    isUrl(inUrl) === true &&
    isValidNumberOfQuestions(inNumberQuestions) === true &&
    isValidNumberOfLevels(inNumberLevels) === true
  ) {
    containerScreen31.classList.toggle('hidden')
    containerScreen32.classList.toggle('hidden')
    renderNextPage(inNumberQuestions)
  } else {
    alert('Favor verificar os campos abaixo')
  }
}

function validationIputData32() {
  getElementsFromHtml()

  if (
    textQuestionValidation(textQuestion) === true &&
    isHexadecimalColor(hexadecimal) === true &&
    isUrl32(inUrl32) === true &&
    isCorrectAnswerEmpty(correctAnswer) === true &&
    isIncorrectAnswerEmpty(incorrectAnswer) === true
  ) {
    console.log('tudo certo')
  } else {
    console.log('algo não está certo')
  }
}

// Function to check number of characters
function checkTitleNumbers(title) {
  if (title.length >= 20 && title.length <= 65) {
    return true
  } else {
    return false
  }
}

// Function to check if is a url
function isUrl(url) {
  try {
    let str = new URL(url)
    return true
  } catch (err) {
    return false
  }
}

// Function to check number min of questions
function isValidNumberOfQuestions(questions) {
  if (questions >= 3) {
    return true
  } else {
    return false
  }
}

// Function to check number min of levels
function isValidNumberOfLevels(levels) {
  if (levels >= 2) {
    return true
  } else {
    return false
  }
}

// Function to validation input data page 3.2, if it is ok, go to next page
function textQuestionValidation(textQuestion) {
  let count = ''
  textQuestion.forEach(elm => {
    if (elm.value !== '' && elm.value.length > 20) {
      count++
    }
  })

  if (textQuestion.length === count) {
    return true
  } else {
    return false
  }
}

// Function to validation input data Hexadecimal color
function isHexadecimalColor(hexadecimal) {
  let str = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
  let count = ''

  hexadecimal.forEach(elm => {
    if (elm.value !== '' && str.test(elm.value) == true) {
      count++
    }
  })

  if (hexadecimal.length == count) {
    return true
  } else {
    return false
  }
}

function isCorrectAnswerEmpty(answer) {
  let count = ''
  answer.forEach(elm => {
    if (elm.value != '') {
      count++
    }
  })

  if (answer.length == count) {
    return true
  } else {
    return false
  }
}

function isIncorrectAnswerEmpty(incorrectAnswer) {
  let count = ''
  incorrectAnswer.forEach(elm => {
    if (elm.value != '') {
      count++
    }
  })

  if (count >= inNumberQuestions) {
    return true
  } else {
    return false
  }
}

function isUrl32(url32) {
  let count = ''
  let filledIput = ''
  url32.forEach(elm => {
    if (elm.value !== '') {
      filledIput++
      try {
        let url = new URL(elm.value)
        count++
      } catch (err) {
        console.log(elm.value)
      }
    }
  })

  if (count === filledIput) {
    return true
  } else {
    return false
  }
}

// Function to render the next page

function renderNextPage(numberQuestions) {
  for (let i = 1; i <= numberQuestions; i++) {
    creatYourQuestions.innerHTML += `
    <div class = "container-father-questions">
      <div class="box-create-questions-closed">
        <h2 class="title-question">Pergunta ${i}</h2>
        <ion-icon name="create-outline" class="edit-icon"></ion-icon>
      </div>
      <div class="box-create-questions hidden">
        <div class="box-questions-with-title">
          <h2 class="title-question">Pergunta ${i}</h2>
          <input
            type="text"
            class="in-title-question"
            placeholder="Texto da pergunta"
          />
          <input
            type="text"
            class="in-background-question"
            placeholder="Cor de fundo da pergunta"
          />
        </div>
        <div class="box-questions-with-title">
          <h2 class="title-question">Resposta correta</h2>
          <input
            type="text"
            class="in-correct-answer"
            placeholder="Resposta correta"
          />
          <input
            type="text"
            class="in-url-img"
            data-img = 'url-correct-img'
            placeholder="URL da imagem"
          />
        </div>
        <div class="box-questions-with-title">
          <h2 class="title-question">Resposta incorreta</h2>
          <input
            type="text"
            class="in-incorrect-answer"
            data-incorrect-answer = "1"
            placeholder="Resposta incorreta 1"
          />
          <input
            type="text"
            class="in-url-img"
            data-img = 'url-incorrect-img-1'
            placeholder="URL da imagem 1"
          />
        </div>
        <div class="box-questions-without-title">
          <input
            type="text"
            class="in-incorrect-answer"
            data-incorrect-answer = "2"
            placeholder="Resposta incorreta 2"
          />
          <input
            type="text"
            class="in-url-img"
            data-img = 'url-incorrect-img-2'
            placeholder="URL da imagem 2"
          />
        </div>
        <div class="box-questions-without-title">
          <input
            type="text"
            class="in-incorrect-answer"
            data-incorrect-answer = "3"
            placeholder="Resposta incorreta 3"
          />
          <input
            type="text"
            class="in-url-img"
            data-img = 'url-incorrect-img-3'
            placeholder="URL da imagem 3"
          />
        </div>
      </div>
    </div>
      `
  }

  setEventListenerToIconEdit()
}

// Function to hidden and show selected inputs

function hiddenAndShowCreateQuestions({ target }) {
  let containerFatherQuestions = document.querySelectorAll(
    '.container-father-questions'
  )

  for (let i = 0; i < containerFatherQuestions.length; i++) {
    if (!containerFatherQuestions[i].children[1].classList.contains('hidden')) {
      containerFatherQuestions[i].children[1].classList.add('hidden')
      containerFatherQuestions[i].children[0].classList.remove('hidden')
    }
  }
  target.parentNode.classList.toggle('hidden')
  target.parentNode.nextElementSibling.classList.toggle('hidden')
}

// Set event listener click on icons
function setEventListenerToIconEdit() {
  let ionIcons = document.querySelectorAll('.edit-icon')

  ionIcons.forEach(elm => {
    elm.addEventListener('click', hiddenAndShowCreateQuestions)
  })
}
