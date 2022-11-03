const noQuizz = document.querySelector('.no-quizz');
const withQuizz = document.querySelector('.with-quizz');

/*Paginas para navegação com 'hidden'*/
const page3 = document.querySelector('.container-page-3-1');
const page1 = document.querySelector('.quizz-list-screen');

const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const allList = document.querySelector('.all');

function toggleTest(){
    page1.classList.toggle('hidden');
    page3.classList.toggle('hidden');
}

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


