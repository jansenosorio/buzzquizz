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

  // Get buttons
  btCreateQuestions = document.querySelector('.bt-create-questions')

  // Add EventListener to Button
  btCreateQuestions.addEventListener('click', validationIputData)
}

getElementsFromHtml()

// Function to validation input data, if it is ok, go to next page
function validationIputData() {
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
            class="in-title-question${i}"
            placeholder="Texto da pergunta"
          />
          <input
            type="text"
            class="in-background-question1${i}"
            placeholder="Cor de fundo da pergunta"
          />
        </div>
        <div class="box-questions-with-title">
          <h2 class="title-question">Resposta correta</h2>
          <input
            type="text"
            class="in-correct-answer1${i}"
            placeholder="Resposta correta"
          />
          <input
            type="text"
            class="in-url-correct-img1${i}"
            placeholder="URL da imagem"
          />
        </div>
        <div class="box-questions-with-title">
          <h2 class="title-question">Resposta incorreta</h2>
          <input
            type="text"
            class="in-incorrect-answer-1${i}"
            placeholder="Resposta incorreta 1"
          />
          <input
            type="text"
            class="in-url-incorrect-img-1${i}"
            placeholder="URL da imagem 1"
          />
        </div>
        <div class="box-questions-without-title">
          <input
            type="text"
            class="in-incorrect-answer-2${i}"
            placeholder="Resposta incorreta 2"
          />
          <input
            type="text"
            class="in-url-incorrect-img-2${i}"
            placeholder="URL da imagem 2"
          />
        </div>
        <div class="box-questions-without-title">
          <input
            type="text"
            class="in-incorrect-answer-3${i}"
            placeholder="Resposta incorreta 3"
          />
          <input
            type="text"
            class="in-url-incorrect-img-3${i}"
            placeholder="URL da imagem 3"
          />
        </div>
      </div>
    </div>
      `
  }

  setEventListenerToIconEdit()
}

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
