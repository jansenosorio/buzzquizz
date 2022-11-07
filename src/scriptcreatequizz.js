// Validation Pages Functions
// Global Var
let inTitle = ''
let inUrl = ''
let inNumberQuestions = ''
let inNumberLevels = ''
let btCreateQuestions = ''
let btCreateLevels = ''
let containerScreen31 = ''
let containerScreen32 = ''
let containerScreen33 = ''
let containerScreenFinalPage = ''
let creatYourQuestions = ''
let textQuestion = ''
let hexadecimal = ''
let inUrl32 = ''
let correctAnswer = ''
let incorrectAnswer = ''

//Creating object for API ponsting
quizz = {
  title: '',
  image: '',
  questions: [],
  levels: []
}

let question = {
  title: '',
  color: '',
  answers: []
}

let answer = {
  text: '',
  image: '',
  isCorrectAnswer: ''
}


function getElementsFromHtml() {
  // get elements from html
  containerScreen31 = document.querySelector('.container-page-3-1')
  containerScreen32 = document.querySelector('.container-page-3-2')
  containerScreen33 = document.querySelector('.container-page-3-3')
  containerScreenFinalPage = document.querySelector('.container-page-final')
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

  inTitleLevels = document.querySelectorAll('.in-title-levels')
  inPorcentMin = document.querySelectorAll('.in-porcent-min')
  inLevelsDescription = document.querySelectorAll('.in-levels-description')
  inUrlImgLevels = document.querySelectorAll('.in-url-img-levels')
  inPorcentMin = document.querySelectorAll('.in-porcent-min')

  // Get buttons
  btCreateQuestions = document.querySelector('.bt-create-questions')
  btCreateLevels = document.querySelector('.bt-create-levels')
  btFinishQuizz = document.querySelector('.bt-finish-quizz')

  // Add EventListener to Button
  btCreateQuestions.addEventListener('click', validationIputData31)
  btCreateLevels.addEventListener('click', validationIputData32)
  btFinishQuizz.addEventListener('click', validationIputData33)
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

    // Add input values to quizz object
    quizz.title = inTitle
    quizz.image = inUrl


    containerScreen31.classList.toggle('hidden')
    containerScreen32.classList.toggle('hidden')
    renderNextPage(inNumberQuestions)
  } else {
    alert('Favor verificar os campos abaixo')
  }
}

// Function to validation input data page 3.2, if ok, go to next page
function validationIputData32() {
  getElementsFromHtml()

  if (
    textQuestionValidation(textQuestion) === true &&
    isHexadecimalColor(hexadecimal) === true &&
    isUrl32(inUrl32) === true &&
    isCorrectAnswerEmpty(correctAnswer) === true &&
    isIncorrectAnswerEmpty(incorrectAnswer) === true
  ) {


    for (let i = 0; i < textQuestion.length; i++) {
      question.title = textQuestion[i].value;
      question.color = hexadecimal[i].value;

      let aux = []

      let ans = document.querySelectorAll(`.answer${i}`)
      let imgUrl = document.querySelectorAll(`.img${i}`)

      for (let j = 0; j < ans.length; j++) {


        if (ans[j].value != '') {
          answer.text = ans[j].value
          answer.image = imgUrl[j].value

          if (ans[j].classList.contains('correct')) {
            aux.push(
              {
                text: ans[j].value,
                image: imgUrl[j].value,
                isCorrectAnswer: true
              })
          }
          else {
            aux.push(
              {
                text: ans[j].value,
                image: imgUrl[j].value,
                isCorrectAnswer: false
              })
          }
        }
      }

      quizz.questions.push(
        {
          title: textQuestion[i].value,
          color: hexadecimal[i].value,
          answers: aux
        })

    }






    containerScreen32.classList.toggle('hidden')
    containerScreen33.classList.toggle('hidden')
    renderNextPage33(inNumberLevels)
  } else {
    alert('Favor verificar os campos, pois há um erro')
  }
}

// Function to validation iput data page 3.3, if ok, go to next page
function validationIputData33() {
  getElementsFromHtml();
  if (
    textLevelsValidation() === true &&
    MinHitPercentage() === true &&
    isUrl33() === true &&
    minCharactersLevelsDescription() === true &&
    isOneLevelZeroPercent() === true
  ) {

    for (let i = 0; i < inTitleLevels.length; i++) {
      quizz.levels.push(
        {
          title: inTitleLevels[i].value,
          image: inUrlImgLevels[i].value,
          text: inLevelsDescription[i].value,
          minValue: inPorcentMin[i].value
        }
      )
    }

    console.log('tudo certo')

    const lastid = SendQuizzToServer()
    renderFinalPage(lastid)

  } else {
    alert('Favor verificar os campos, há algo errado')
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
// Check if quizz has a correct answer and return false or true
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
// Check if quizz has a min number of incorrect answer and return false or true
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

// Check if link is a valid url and return false or true
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

// Function to render the next page 3.2

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
            class="in-correct-answer correct answer${i - 1}"
            placeholder="Resposta correta"
          />
          <input
            type="text"
            class="in-url-img img${i - 1}"
            data-img = 'url-correct-img'
            placeholder="URL da imagem"
          />
        </div>
        <div class="box-questions-with-title">
          <h2 class="title-question">Resposta incorreta</h2>
          <input
            type="text"
            class="in-incorrect-answer incorrect answer${i - 1}"
            data-incorrect-answer = "1"
            placeholder="Resposta incorreta 1"
          />
          <input
            type="text"
            class="in-url-img img${i - 1}"
            data-img = 'url-incorrect-img-1'
            placeholder="URL da imagem 1"
          />
        </div>
        <div class="box-questions-without-title">
          <input
            type="text"
            class="in-incorrect-answer incorrect answer${i - 1}"
            data-incorrect-answer = "2"
            placeholder="Resposta incorreta 2"
          />
          <input
            type="text"
            class="in-url-img img${i - 1}"
            data-img = 'url-incorrect-img-2'
            placeholder="URL da imagem 2"
          />
        </div>
        <div class="box-questions-without-title">
          <input
            type="text"
            class="in-incorrect-answer incorrect answer${i - 1}"
            data-incorrect-answer = "3"
            placeholder="Resposta incorreta 3"
          />
          <input
            type="text"
            class="in-url-img img${i - 1}"
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

// Function to hidden and show selected inputs 3.2

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
  let ionIconsLevels = document.querySelectorAll('.edit-levels')

  ionIcons.forEach(elm => {
    elm.addEventListener('click', hiddenAndShowCreateQuestions)
  })

  ionIconsLevels.forEach(elm => {
    elm.addEventListener('click', hiddenAndShowCreatelevels)
  })
}

// Function to render page 3.3
function renderNextPage33(numberLevels) {
  let containerBoxLevels = document.querySelector('.container-box-levels')

  for (let i = 1; i <= numberLevels; i++) {
    containerBoxLevels.innerHTML += `
    <div class="container-father-levels">
    <div class="box-create-levels-closed">
      <h2 class="title-box">Nível ${i}</h2>
      <ion-icon class="edit-levels" name="create-outline"></ion-icon>
    </div>
    <div class="box-create-levels hidden">
      <div class="box-levels">
        <h2 class="title-box">Nível ${i}</h2>
        <input
          type="text"
          class="in-title-levels"
          placeholder="Título do nível"
        />
        <input
          type="text"
          class="in-porcent-min"
          placeholder="% de acerto mínima"
        />
        <input
          type="text"
          class="in-url-img-levels"
          placeholder="URL da imagem do nível"
        />
        <input
          type="text"
          class="in-levels-description"
          placeholder="Descrição do nível"
        />
      </div>
    </div>
  </div>
    `
  }

  setEventListenerToIconEdit()
}

// Function to hidden and show create levels
function hiddenAndShowCreatelevels({ target }) {
  let containerFatherLevels = document.querySelectorAll(
    '.container-father-levels'
  )

  for (let i = 0; i < containerFatherLevels.length; i++) {
    if (!containerFatherLevels[i].children[1].classList.contains('hidden')) {
      containerFatherLevels[i].children[1].classList.add('hidden')
      containerFatherLevels[i].children[0].classList.remove('hidden')
    }
  }
  target.parentNode.classList.toggle('hidden')
  target.parentNode.nextElementSibling.classList.toggle('hidden')
}

// Function to check min text characters
function textLevelsValidation() {
  let count = ''

  inTitleLevels.forEach(elm => {
    if (elm.value.length > 10) {
      count++
    }
  })

  if (count === inTitleLevels.length) {
    return true
  } else {
    return false
  }
}

// Function to check minimum percentage
function MinHitPercentage() {
  let count = ''

  inPorcentMin.forEach(elm => {
    if (Number(elm.value) >= 0 && Number(elm.value) <= 100) {
      count++
    }
  })

  if (count === inPorcentMin.length) {
    return true
  } else {
    return false
  }
}

// Function to check if url is valid
function isUrl33() {
  let count = ''
  let filledIput = ''
  inUrlImgLevels.forEach(elm => {
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

// Function to check min characters of description
function minCharactersLevelsDescription() {
  let count = ''

  inLevelsDescription.forEach(elm => {
    if (elm.value.length > 30) {
      count++
    }
  })

  if (count === inLevelsDescription.length) {
    return true
  } else {
    return false
  }
}

// Function to check if has a zero
function isOneLevelZeroPercent() {
  let count = 0

  inPorcentMin.forEach(elm => {
    if (Number(elm.value) == 0) {
      count++
    }
  })

  if (count > 0) {
    return true
  } else {
    return false
  }
}


function SendQuizzToServer() {
  const promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizz)
  promise.then(response => {
    const data = response.data
    let listId = []

    if (localStorage.getItem('id')) {
      listId = localStorage.getItem('id')
      let pars = JSON.parse(listId)
      pars.push(data.id)
      let strin = JSON.stringify(pars)
      localStorage.setItem('id', strin)
      localStorage.setItem(data.id, data.key)
    }
    else {
      listId.push(data.id)
      let strin = JSON.stringify(listId)
      localStorage.setItem('id', strin)
      localStorage.setItem(data.id, data.key)
    }
    return data.id
  })
  promise.catch(error => console.log(error))
}

function renderFinalPage(id) {
  containerScreen33.classList.toggle('hidden')
  containerScreenFinalPage.classList.toggle('hidden')

  const exibir = document.querySelector('.final-quizz');
  exibir.innerHTML = `
  <div id="${id}" style="background-image: url(${quizz.image
    })" class="quizz">
            <h3>
            ${quizz.title}
            </h3>
        </div>
  `

  let btnBack = document.querySelector('.back-to-home')
  btnBack.addEventListener('click', () => {
    containerScreenFinalPage.classList.toggle('hidden')
    document.querySelector('.quizz-list-screen').classList.toggle('hidden')
  })
}