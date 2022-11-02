const noQuizz = document.querySelector('.no-quizz');
const withQuizz = document.querySelector('.with-quizz');

function toggleTest(){
    noQuizz.classList.toggle('hidden');
    withQuizz.classList.toggle('hidden');
}