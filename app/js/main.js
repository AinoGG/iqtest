const mainPage = document.querySelector('.main-page__content');
const appPage = document.querySelector('.app-styles');
const btnStart = document.querySelectorAll('.test-btn');
const btnBack = document.querySelectorAll('.back-to-main');
const btnNext = document.querySelector('#next');

const questionElement = document.querySelector('#question');
const progressLine = document.querySelector('.progress-bar');
const answerElement = document.querySelector('.answers__item');
const answerBox = document.querySelector('.answers');
const answerElementLabel = document.querySelectorAll('.answer__label');
const gameLayer = document.querySelector('.game-layer');
const resultPage = document.querySelector('.result-page');
const imageTest = document.createElement('img');
const footerYear = document.querySelector('.footer__year');
const footerText = document.querySelector('.footer__result');
const display = document.querySelector('#timer');



imageTest.classList.add('image-question');
let index = 0;

//array

const array = [
    {
        question: 'Ваш пол',
        answers: [
            {text: 'Мужской',trigger: 'line'},
            {text: 'Женский',trigger: 'line'} 
        ],
        trigger: 'line'        
    },
    {
        question: 'Укажите ваш возраст',
        answers: [
            {text:'до 18', trigger: 'line'},
            {text:'от 18 до 28', trigger: 'line'},
            {text:'от 29 до 35', trigger: 'line'},
            {text:'от 36', trigger: 'line'}
        ],
        trigger: 'line'        
    },
    {
        question: 'Выберите лишнее',
        answers: [
            {text:'Дом', trigger: 'line'},
            {text:'Шалаш', trigger: 'line'},
            {text:'Бунгало', trigger: 'line'},
            {text:'Скамейка', trigger: 'line'},
            {text:'Хижина', trigger: 'line'}
        ],
        trigger: 'line'
    },
    {
        question: 'Продолжите числовой ряд:<br> 18 20 24 32 ',
        answers: [
            {text:'62', trigger: 'line'},
            {text:'48', trigger: 'line'},
            {text:'74', trigger: 'line'},
            {text:'57', trigger: 'line'},
            {text:'60', trigger: 'line'},
            {text:'77', trigger: 'line'}
        ],
        trigger: 'line'
    },
    {
        question: 'Выберите цвет, который сейчас наиболее Вам приятен:',
        answers: [
            {text:'gray', trigger: 'color'},
            {text:'blue', trigger: 'color'},
            {text:'green', trigger: 'color'},
            {text:'red', trigger: 'color'},
            {text:'yellow', trigger: 'color'},
            {text:'brown', trigger: 'color'},
            {text:'black', trigger: 'color'},
            {text:'purple', trigger: 'color'},
            {text:'aqua', trigger: 'color'}
        ],
        trigger: 'color'
    },
    {
        question: 'Отдохните пару секунд, еще раз Выберите цвет, который сейчас наиболее Вам приятен:',
        answers: [
            {text:'gray', trigger: 'color'},
            {text:'aqua', trigger: 'color'},
            {text:'brown', trigger: 'color'},
            {text:'green', trigger: 'color'},
            {text:'black', trigger: 'color'},
            {text:'red', trigger: 'color'},
            {text:'purple', trigger: 'color'},
            {text:'yellow', trigger: 'color'},
            {text:'blue', trigger: 'color'}
        ],
        trigger: 'color'
    },
    {
        question: 'Какой из городов лишний?',
        answers: [
            {text:'Вашингтон', trigger: 'line'},
            {text:'Лондон', trigger: 'line'},
            {text:'Париж', trigger: 'line'},
            {text:'Нью-Йорк', trigger: 'line'},
            {text:'Москва', trigger: 'line'},
            {text:'Оттава', trigger: 'line'}
        ],
        trigger: 'line'
    },
    {
        question: 'Выберите правильную фигуру из четырёх пронумерованных.',
        image: './images/peopleImage.jpg',
        answers: [
            {text:'1', trigger: 'image'},
            {text:'2', trigger: 'image'},
            {text:'3', trigger: 'image'},
            {text:'4', trigger: 'image'}
        ],
        trigger: 'image'
    },
    {
        question: 'Вам привычнее и важнее:',
        answers: [
            {text:'Наслаждаться каждой минутой проведенного времени', trigger: 'line'},
            {text:'Быть устремленными мыслями в будущее', trigger: 'line'},
            {text:'Учитывать в ежедневной практике прошлый опыт', trigger: 'line'}
        ],
        trigger: 'line'
    },
    {
        question: 'Какое определение, по-Вашему, больше подходит к этому геометрическому изображению:',
        image: './images/rombImage.jpg',
        answers: [
            {text:'оно остроконечное', trigger: 'line'},
            {text:'оно устойчиво', trigger: 'line'},
            {text:'оно-находится в состоянии равновесия', trigger: 'line'}
        ],
        trigger: 'lineImage'
    },
    {
        question: 'Вставьте подходящее число',
        image: './images/starImage.jpg',
        answers: [
            {text:'34', trigger: 'image'},
            {text:'36', trigger: 'image'},
            {text:'53', trigger: 'image'},
            {text:'44', trigger: 'image'},
            {text:'66', trigger: 'image'},
            {text:'32', trigger: 'image'}
        ],
        trigger: 'image'
    }
    
]

//step of progress

let step = 100 / array.length



//start and navigation


function startTest() {
    mainPage.classList.add('hide');
    footerYear.classList.add('hide');
    
    if(appPage){
        appPage.classList.remove('hide');               
    }   
    if(appPage.childElementCount == 0) {
        appPage.style.height = '0px'
        resultPage.classList.remove('hide');        
        footerText.classList.remove('hide');
    }
    setNextQuestion();
}


function backToMain() {
    mainPage.classList.remove('hide');
    appPage.classList.add('hide');
    resultPage.classList.add('hide');
    clearElements()
    resetIndex()
    footerText.classList.add('hide');
    footerYear.classList.remove('hide');
}

function resetIndex() {
    index = 0
}

function clearElements() {
    answerBox.innerHTML = '';
    questionElement.innerHTML =''
}

btnStart.forEach(item => item.addEventListener('click', startTest));

btnBack.forEach(item => item.addEventListener('click', backToMain));

function showQuestion(question) {
    questionElement.innerHTML = question    
}




//Берем ответы из массива array и создаем их в виде элементов, в каждом объекте массива array есть тригер с указанием какого типа у нас ответы(с картинкой, с цветами или полоской с текстом), если бы я делал это на реакте, то скорее всего я бы под каждый тип ответа создавал отдельный компонент и применял его при похожем тригере, который хранил бы в стейте, но у вас VUE с которым я начну разбираться в ближайшем будушем.  

function showAnswers(answer) {
    answer.answers.forEach((item, i) => {
        const element = document.createElement('div');
        element.innerHTML = `        
            <input class="input-answer" type="radio" name="answer" id="answer${i+1}">
            <label class="answer__label" for="answer${i+1}">${item.text}</label>        
        `;       
        
        if(item.trigger === 'line'){
            element.classList.add('answers__item','line');
            answerBox.style.cssText = `            
                display: flex;
                flex-direction: column;             
            `;                      
        }
        if(item.trigger === 'color') {
            element.classList.add('answers__item','color')
            answerBox.style.cssText = `            
                display: grid;
                grid-template-columns: repeat(3, 75px);
                grid-column-gap: 21px;
                grid-row-gap: 24px;    
                justify-content: center         
            `;

            element.style.cssText = `
                background-color: ${item.text};
            `;           
        }
        if(item.trigger === 'image') {            
            answerBox.style.cssText = `            
                display: flex;
                flex-direction: row; 
                justify-content: space-between; 
                margin: 0 auto;
                width: 290px;           
            `;
            element.classList.add('answers__item','image');
        }

        addImage(answer);
        changeProgressLine(); 
        answerBox.append(element);
        
    }); 

//добавляем/удаляем активный класс, снимаем дизейбл с кнопки при активном классе

    let elements = document.getElementsByClassName('answers__item');
        for (let i = 0; i < elements.length; ++i) {
            elements[i].addEventListener('click', function() {  
                for (let i = 0; i < elements.length; ++i) {
                    elements[i].classList.remove('active'); 
                }
                this.classList.add('active');
                if(elements[i].classList.contains('active')) {
                    btnNext.disabled = false
                }
            });
        }

        
}


// таймер код писал не сам, времени думать уже не оставалось

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ':' + seconds + ' МИНУТ';

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

//заполняем шкалу прогресса вызываем функцию в showAnswters, которую вызываем в setNextQuestion которую мы вызываем по клику на далее и изменяем вместе с кликом индекс, который мы умножаем на шаг, в общем тут еще рефакторить и рефакторить

function changeProgressLine() {
    progressLine.style.width = `${step * index}%`;
}

//функция которая по названию ответа в массиве (название цвета) ставит фон на квадратик, вызывается в showAnswers

function addImage(item) {    
        if(item.trigger === 'image' || item.trigger === 'lineImage') {            
            imageTest.src = `${item.image}`
            questionElement.append(imageTest)
        }    
}


// показывает вопрос с ответами

function setNextQuestion() {  
        showQuestion(array[index].question);
        showAnswers(array[index]); 
             
}


//по клику на некст прибавляем индекс, тем самым берем следующий вопрос из массива array очищаем прошлые элементы и при достижении максимального индекса выдаем страницу со спинером и запускаем небольшой таймаут, чтобы сделать вид обработки результатов, в идеале тут еще формируется массив с выбранными ответами, но нет никаких инструкций как обработать результат, поэтому не стал это делать, ну и запустили таймер на странице результатов, тоже после того как все вопросы кончились. Добавил дизейбл кнопки при клике

    btnNext.addEventListener('click', () => {
        clearElements();  
        ++index
        btnNext.disabled = true;       
        if(index < array.length ){
            setNextQuestion(); 
        }             
       
        if(index == array.length) {
            gameLayer.innerHTML = `
                <div class="progress-line">
                    <div class="progress-bar" style="width:100%"></div>
                </div>
                <div id="question" class="question">Обработка результатов</div>
                <div class="answers spinner" >
                    <img src="./images/spinner.png" alt="spinner">
                </div>
            `;
            setTimeout(() => {
                appPage.removeChild(gameLayer)
                appPage.classList.add('hide');
                resultPage.classList.remove('hide');
                footerText.classList.remove('hide');
                startTimer(600, display)
            }, 3000)
        }               
    });


//работа с API, создаем асинхронную функцию гетРесурс, в ней с помощью фетча делаем запрос на урл, дожидаемся ответа, обрабатываем результат ответа от сервера если он не пришел или возвращаем джейсон

const btnPhone = document.querySelector('#callTo');
const slotForLuke = document.querySelector('.response-slot');

const getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok) {
        const error = document.createElement('div');
        error.innerHTML = `
            <p>Возникла ошибка, статус ${res.status}</p>
        `;
    }

    return await res.json();
}

//вызываем функцию, она возвращает промис, обрабатываем с then, сначала сделал просто добавление res.name по клику, но понял что можно бесконечно тыкать и Люки будут появляться, сделал чтобы не появлялись. В забании было обработать ответ от сервера и вывести не в JSON, надеюсь имени хватит и не не нужно было весь ответ от сервера сюда тянуть. стоило добавить  catch.

getResource('https://swapi.dev/api/people/1/')
            .then(res => {
                const divLuke = document.createElement('div');
                divLuke.innerHTML = `Вы ${res.name}`;
                btnPhone.addEventListener('click', () => {
                    if(slotForLuke.childElementCount == 0) {
                        slotForLuke.append(divLuke)
                    }
                });
                
            })
            
//Итак, финальный комментарий, возможно до этого момента вы даже не дойдете. На самом деле я джун и у меня мало опыта, поэтому так много говнокода, да и понимаю я, что это просто css бирюльки, а никакое не SPA, то что страница не перезагружается это не значит что это приложение. В самом начале когда мне пришло это тестовое задание я встал перед выбором - засесть и каким-то образом вникнуть во VUE за день, или городить тот велосипед что я нагородил. Поначалу плевался от дизайна, 4 шрифта, везде разные размеры, никаких стандартов да и просто издевательство над верстальщиком. В такие моменты начинаешь думать, а вдруг это часть задания и если ты это не сделаешь то тебя даже и смотреть не будут, а потом понимаешь, что если такие задания будут дальше, то лучше поискать другое место работы =) ну это так, фидбек. Пока писал понял, что не сделал дизейблед кнопку, ну вроде сделал быстро. Не сделал кастомные радио-инпуты сразу, и после уже весь функционал сломался бы, класс эктив добавляется по клику на весь айтем, там есть край пикселя, который инпут не активирует, но всё это легко допиливается. Хочу сказать спасибо за предоставленную возможность посидеть подумать головой в интенсивном режиме, если не возьмете не обижусь. PEACE






