const noQuizz = document.querySelector('.no-quizz');
const withQuizz = document.querySelector('.with-quizz');

const btnCreat = document.querySelector('.btn-create');

/*Paginas para navegação com 'hidden'*/
const page3 = document.querySelector('.container-page-3-1');
const page1 = document.querySelector('.quizz-list-screen');
const page2 = document.querySelector('.quizz-page-screen');

const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const allList = document.querySelector('.all');
const quizzPage = document.querySelector('.quizz-page');

/*Navegação pagina1 -> pagina3*/
btnCreat.addEventListener('click', () => {
    page1.classList.toggle('hidden');
    page3.classList.toggle('hidden');
})

/*Função para renderizar os quizzes de outros usuarios*/
function renderAllQuizz(list) {
    list.forEach(elm => {
        allList.innerHTML += `
        <div id="${elm.id}" style="background-image: url(${elm.image})" class="quizz">
            <h3>
            ${elm.title}
            </h3>
        </div>
        `
    });
    
    //Navegação page1 -> page2
    const addListen = document.querySelectorAll('.quizz');
    addListen.forEach(elm => {
        elm.addEventListener('click', () => {
            page1.classList.toggle('hidden');
            page2.classList.toggle('hidden');
            getSingleQuizz(elm);
        })
    })
}
/*Função quer busca o quiz de outros usuarios*/
function getAllQuizz() {
    const promise = axios.get(url + "quizzes")
    promise.then(response => {
        const data = response.data;
        renderAllQuizz(data);
    })
    promise.catch(error => console.log(error));
}

getAllQuizz();

/*Função que busca o quizz clicado selecionado*/

function getSingleQuizz(elm){
    const quizzId = elm.id;
    const promise = axios.get(`${url}quizzes/${elm.id}`);
    promise.then(response =>{
        const data = response.data;
        renderSingleQuizz(data);
    })
    promise.catch(error => console.log(error));
}

function renderSingleQuizz(quizz){
    quizzPage.innerHTML = `
        <header class="quizz-title">
            <h3>${quizz.title}</h3>
        </header>
    `;
    const quizzTitle = document.querySelector('.quizz-title');
    quizzTitle.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quizz.image})`;

    quizz.questions.forEach(singleQuestion =>{

        let questionAnswers = '';
        let answersList = singleQuestion.answers.sort(randomizeAnswers);

        answersList.forEach(answers=>{
            questionAnswers += `
            <div class="quizz-single-answer">
                <img
                src="${answers.image}"
                alt=""
                />
                <h5>${answers.text}</h5>
            </div>
            `;
        });

        quizzPage.innerHTML += `
        <section class="quizz-content">
              <header class="quizz-question" style="background-color:${singleQuestion.color}">
                <h4>${singleQuestion.title}</h4>
              </header>
              <main class="quizz-answers">
                ${questionAnswers}
              </main>
        </section>
        `;
        
        

    });
}

function randomizeAnswers(){
    return Math.random() - 0.5;
}