// const noQuizz = document.querySelector('.no-quizz');
// const withQuizz = document.querySelector('.with-quizz');

const btnCreat = document.querySelectorAll('.btn-create')

/*Paginas para navegação com 'hidden'*/
const page3 = document.querySelector('.container-page-3-1')
const page1 = document.querySelector('.quizz-list-screen')
const page2 = document.querySelector('.quizz-page-screen')

const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/'
const allList = document.querySelector('.all')
const quizzPage = document.querySelector('.quizz-page')

let quizzLevel;
let quizzData;
/*Lista com todos os quizzes*/
let quizzList
/*Navegação pagina1 -> pagina3*/
btnCreat.forEach((elm) => {
  elm.addEventListener("click", () => {
    showHidePage(page3, page1);
  });
});

/*Função para renderizar os quizzes de outros usuarios*/
function renderAllQuizz(list) {
  let index = []
  while (index.length < 9) {
    let aux = Math.floor(Math.random() * list.length)
    if (!index.includes(aux)) {
      index.push(aux)
    }
  }

  for (let i = 0; i < index.length; i++) {
    allList.innerHTML += `
            <div id="${list[index[i]].id}" style="background-image: url(${
      list[index[i]].image
    })" class="quizz">
                <h3>
                ${list[index[i]].title}
                </h3>
            </div>
        `
  }

  //Navegação page1 -> page2
  const addListen = document.querySelectorAll(".quizz");
  addListen.forEach((elm) => {
    elm.addEventListener("click", () => {
      showHidePage(page2, page1);
      getSingleQuizz(elm);
    });
  });
}

//Navegação page1 -> page2
const addListen = document.querySelectorAll('.quizz')
addListen.forEach(elm => {
  elm.addEventListener('click', () => {
    page1.classList.toggle('hidden')
    page2.classList.toggle('hidden')
    getSingleQuizz(elm)
  })
})

/*Função quer busca o quiz de outros usuarios*/
function getAllQuizz() {
  const promise = axios.get(url + 'quizzes')
  promise.then(response => {
    quizzList = response.data
    renderAllQuizz(quizzList)
  })
  promise.catch(error => console.log(error))
}

getAllQuizz()

/*Função que busca o quizz clicado selecionado*/

function getSingleQuizz(elm) {
  window.scrollTo(0, 0);
  const quizzId = elm.id;
  const promise = axios.get(`${url}quizzes/${elm.id}`);
  promise.then((response) => {
    quizzData = response.data;
    renderSingleQuizz(quizzData);
    answerOnClick(quizzData);
  });
  promise.catch((error) => console.log(error));
}

function renderSingleQuizz(quizz) {
  quizzPage.innerHTML = `
        <header class="quizz-title">
            <h3>${quizz.title}</h3>
        </header>
    `;
  const quizzTitle = document.querySelector('.quizz-title')
  quizzTitle.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quizz.image})`

  renderQuestions(quizz.questions);
  quizzPage.innerHTML += `
  <div class="quizz-level">
  </div>
  `;
}

function renderQuestions(questions) {
  questions.forEach((singleQuestion) => {
    let questionAnswers = "";
    let answersList = singleQuestion.answers.sort(randomizeAnswers);
    answersList.forEach((answers) => {
      questionAnswers += `
            <div class="quizz-single-answer" value="${answers.isCorrectAnswer}">
                <!--<img
                src="${answers.image}"
                alt=""
                />-->
                <div class="answer-img" style="background-image:url(${answers.image})"></div>
                <h5>${answers.text}</h5>
            </div>
            `
    })

    quizzPage.innerHTML += `
        <section class="quizz-content">
              <header class="quizz-question" style="background-color:${singleQuestion.color}">
                <h4>${singleQuestion.title}</h4>
              </header>
              <main class="quizz-answers">
                ${questionAnswers}
              </main>
        </section>
        `
  })
}

function answerOnClick(quizz) {
  const questionsList = document.querySelectorAll(".quizz-content");
  let answeredQuestionsCounter = 0;
  let rightAnswersCounter = 0;
  questionsList.forEach((question) => {
    const questionAnswers = question.querySelectorAll(".quizz-single-answer");
    questionAnswers.forEach((answer) => {
      answer.addEventListener("click", () => {
        if (verifySelected(answer)) {
          return
        }
        answeredQuestionsCounter++;
        answer.classList.add("selected");
        modifyAnswersAfterSelected(answer.parentNode);

        if (countRightAnswers(answer)) {
          rightAnswersCounter++;
        }

        if (answeredQuestionsCounter === questionsList.length) {
          setTimeout(() => {
            showResultOfQuestions(
              rightAnswersCounter,
              answeredQuestionsCounter,
              quizz.levels
            );
            rightAnswersCounter = 0;
            answeredQuestionsCounter = 0;

            quizzLevel.querySelector('.quizz-content').scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 2000);
        } else {
          setTimeout(() => {
            question.nextElementSibling.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 2000);
        }
      });
    });
  });
}

function modifyAnswersAfterSelected(answersList) {
  const questionAnswers = answersList.querySelectorAll('.quizz-single-answer')
  questionAnswers.forEach(answer => {
    if (!verifySelected(answer)) {
      answer.classList.add('notSelected')
    }
    const answerValue = answer.getAttribute('value') == 'true'
    verifyRightOrWrong(answerValue, answer)
  })
}

function verifyRightOrWrong(answerValue, answer) {
  if (answerValue) {
    answer.classList.add('quizz-right-answer')
  } else {
    answer.classList.add('quizz-wrong-answer')
  }
}

function verifySelected(answer) {
  return (
    answer.classList.contains('notSelected') ||
    answer.classList.contains('selected')
  )
}
function showResultOfQuestions(rightAnswers, totalAnswered, levels) {
  const rightAnswersPercent = Math.floor((rightAnswers / totalAnswered) * 100);
  let resultLevel = 0;
  levels.forEach((level) => {
    if (
      level.minValue <= rightAnswersPercent &&
      resultLevel <= level.minValue
    ) {
      resultLevel = level.minValue;
    }
  });
  const selectedLevel = levels.filter((level) => {
    return level.minValue === resultLevel;
  });
  renderLevel(selectedLevel[0], rightAnswersPercent);
  backToHome();
  resetQuizz();
}

function renderLevel(level, rightAnswersPercent) {
  quizzLevel = document.querySelector(".quizz-level");
  quizzLevel.innerHTML += `
      <section class="quizz-content">
        <header class="quizz-question">
          <h4>
            ${rightAnswersPercent}% de acerto: ${level.title}!
          </h4>
        </header>
        <main class="quizz-answers quizz-recomendation">
          <img
            src="${level.image}"
            alt=""
          />
          <p>
            ${level.text}
          </p>
        </main>
      </section>
      <div class="btn-group">
        <button class="btn-resetQuiz">Reiniciar Quizz</button>
        <button class="btn-backToHome">Voltar pra home</button>
      </div>
  
  `;
}

function countRightAnswers(answer) {
  return (
    answer.classList.contains("selected") &&
    answer.classList.contains("quizz-right-answer")
  );
}
function showResultOfQuestions(rightAnswers, totalAnswered, levels) {
  const rightAnswersPercent = Math.floor((rightAnswers / totalAnswered) * 100);
  let resultLevel = 0;
  levels.forEach((level) => {
    if (
      level.minValue <= rightAnswersPercent &&
      resultLevel <= level.minValue
    ) {
      resultLevel = level.minValue;
    }
  });
  const selectedLevel = levels.filter((level) => {
    return level.minValue === resultLevel;
  });
  renderLevel(selectedLevel[0], rightAnswersPercent);
  backToHome();
  resetQuizz();
}

function renderLevel(level, rightAnswersPercent) {
  quizzLevel = document.querySelector(".quizz-level");
  quizzLevel.innerHTML += `
      <section class="quizz-content">
        <header class="quizz-question">
          <h4>
            ${rightAnswersPercent}% de acerto: ${level.title}!
          </h4>
        </header>
        <main class="quizz-answers quizz-recomendation">
          <img
            src="${level.image}"
            alt=""
          />
          <p>
            ${level.text}
          </p>
        </main>
      </section>
      <div class="btn-group">
        <button class="btn-resetQuiz">Reiniciar Quizz</button>
        <button class="btn-backToHome">Voltar pra home</button>
      </div>
  
  `;
}

function countRightAnswers(answer) {
  return (
    answer.classList.contains("selected") &&
    answer.classList.contains("quizz-right-answer")
  );
}

function randomizeAnswers() {
  return Math.random() - 0.5
}

function showHidePage(showPage, hidePage) {
  showPage.classList.toggle("hidden");
  hidePage.classList.toggle("hidden");
}

function backToHome() {
  const btnBackToHome = document.querySelector(".btn-backToHome");

  btnBackToHome.addEventListener("click", () => {
    showHidePage(page1, page2);
  });
}
function resetQuizz() {
  const btnResetQuiz = document.querySelector(".btn-resetQuiz");
  btnResetQuiz.addEventListener("click", () => {
    const selectAllAnswers = document.querySelectorAll(".quizz-single-answer");
    selectAllAnswers.forEach((answer) => {
      answer.classList.remove("selected");
      answer.classList.remove("notSelected");
      answer.classList.remove("quizz-right-answer");
      answer.classList.remove("quizz-wrong-answer");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    quizzLevel.innerHTML = "";
    answerOnClick(quizzData);
  });
}

function showHidePage(showPage, hidePage) {
  showPage.classList.toggle("hidden");
  hidePage.classList.toggle("hidden");
}

function backToHome() {
  const btnBackToHome = document.querySelector(".btn-backToHome");

  btnBackToHome.addEventListener("click", () => {
    showHidePage(page1, page2);
  });
}
function resetQuizz() {
  const btnResetQuiz = document.querySelector(".btn-resetQuiz");
  btnResetQuiz.addEventListener("click", () => {
    const selectAllAnswers = document.querySelectorAll(".quizz-single-answer");
    selectAllAnswers.forEach((answer) => {
      answer.classList.remove("selected");
      answer.classList.remove("notSelected");
      answer.classList.remove("quizz-right-answer");
      answer.classList.remove("quizz-wrong-answer");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    quizzLevel.innerHTML = "";
    answerOnClick(quizzData);
  });
}
