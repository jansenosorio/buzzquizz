// const noQuizz = document.querySelector('.no-quizz');
// const withQuizz = document.querySelector('.with-quizz');

const btnCreat = document.querySelectorAll('.btn-create');

/*Paginas para navegação com 'hidden'*/
const page3 = document.querySelector('.container-page-3-1');
const page1 = document.querySelector('.quizz-list-screen');
const page2 = document.querySelector('.quizz-page-screen');

const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const allList = document.querySelector('.all');

/*Lista com todos os quizzes*/
let quizzList;


/*Navegação pagina1 -> pagina3*/
btnCreat.forEach(elm => {
    elm.addEventListener('click', () => {
        page1.classList.toggle('hidden');
        page3.classList.toggle('hidden');
    })
})

/*Função para renderizar os quizzes de outros usuarios*/
function renderAllQuizz(list) {
    let index = [];
    while (index.length < 9) {
        let aux = Math.floor(Math.random() * list.length);
        if (!index.includes(aux)) {
            index.push(aux);
        }
    }

    for (let i = 0; i < index.length; i++) {
            allList.innerHTML += `
            <div id="${list[index[i]].id}" style="background-image: url(${list[index[i]].image})" class="quizz">
                <h3>
                ${list[index[i]].title}
                </h3>
            </div>
        `
    }

    //Navegação page1 -> page2
    const addListen = document.querySelectorAll('.quizz');
    addListen.forEach(elm => {
        elm.addEventListener('click', () => {
            page1.classList.toggle('hidden');
            page2.classList.toggle('hidden');
        })
    })
}
/*Função quer busca o quiz de outros usuarios*/
function getAllQuizz() {
    const promise = axios.get(url + "quizzes")
    promise.then(response => {
        quizzList = response.data;
        renderAllQuizz(quizzList);
    })
    promise.catch(error => console.log(error));
}

getAllQuizz();


