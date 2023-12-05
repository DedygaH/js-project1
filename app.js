const gameContainer = document.getElementById("game-container"); // Получаем элемент контейнера игры из DOM
const difficultySelect = document.getElementById("difficulty"); // Получаем элемент выбора сложности из DOM
const speedSelect = document.getElementById("speed"); // Получаем элемент выбора скорости из DOM
const livesSelect = document.getElementById("lives"); // Получаем элемент выбора количества жизней из DOM
const scoreDisplay = document.getElementById("score");
// const cursor = document.createElement("div"); // Создаем новый элемент для курсора
const cursor = document.getElementById("cursor"); // Получаем элемент для курсора
let score = 0; // Инициализируем переменную для счета очков
let lives = parseInt(livesSelect.value); // Инициализируем переменную для количества жизней, преобразовав строковое значение в число


cursor.id = "cursor";
gameContainer.appendChild(cursor);  // Добавляем курсор в контейнер игры
// gameContainer.addEventListener("mousemove", (event) => { //прослеживаем движение mousemove в элементе gameContainer
//   const cursorWidth = cursor.offsetWidth;
//   const cursorHeight = cursor.offsetHeight;
//   const containerWidth = gameContainer.offsetWidth;
//   const containerHeight = gameContainer.offsetHeight;
//   let x = event.clientX - cursorWidth / 2;
//   let y = event.clientY - cursorHeight / 2;


// if (x < 0) {   // Проверяем, находится ли курсор за пределами контейнера по оси X
//   x = 0;
// } else if (x + cursorWidth >= containerWidth) {
//   x = containerWidth - cursorWidth;
// }
// if (y < 200) {   // Проверяем, находится ли курсор за пределами контейнера по оси Y
//   y = 200;
// } else if (y + cursorHeight >= containerHeight) {
//   y = containerHeight - cursorHeight;

// }
// cursor.style.left = `${x - 12}px`;   // Устанавливаем новые координаты для стиля left и top курсора
// cursor.style.top = `${y -95}px`;
// });




gameContainer.addEventListener("mousemove", (event) => {
  const cursorWidth = cursor.offsetWidth;
  const cursorHeight = cursor.offsetHeight;
  const containerWidth = gameContainer.offsetWidth;
  const containerHeight = gameContainer.offsetHeight;
  let x = event.clientX - cursorWidth / 2;
  let y = event.clientY - cursorHeight / 2;




  if (x < 0) {
    x = 0;
  } else if (x + cursorWidth >= containerWidth) {
    x = containerWidth - cursorWidth;
  }
  


  if (y < 0) {
    y = 0;
  } else if (y + cursorHeight >= containerHeight) {
    y = containerHeight - cursorHeight;
  }


  // if (y < 200) {
  //   y = 200;
  // } else if (y + cursorHeight >= containerHeight) {
  //   y = containerHeight - cursorHeight;
  // }

  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
});






function createTarget() {   // Функция для создания новой мишени
  const target = document.createElement("div"); // Создаем новый элемент для мишени
  target.classList.add("target"); // Добавляем класс 'target' к элементу мишени



  target.style.top = `${Math.floor(
    Math.random() * (gameContainer.offsetHeight - target.offsetHeight)
  )}px`;
  target.style.left = `${Math.floor(
    Math.random() * (gameContainer.offsetWidth - target.offsetWidth)
  )}px`;
  
  if (parseInt(target.style.top) < 0) {
    target.style.top = "0px";
  }
  
  if (parseInt(target.style.left) < 0) {
    target.style.left = "0px";
  }
  
  if (
    parseInt(target.style.top) + target.offsetHeight >
    gameContainer.offsetHeight
  ) {
    target.style.top = `${
      gameContainer.offsetHeight - target.offsetHeight
    }px`;
  }
  
  if (
    parseInt(target.style.left) + target.offsetWidth >
    gameContainer.offsetWidth
  ) {
    target.style.left = `${
      gameContainer.offsetWidth - target.offsetWidth
    }px`;
  }







  // target.style.top = `${Math.floor(
  //   Math.random() * (gameContainer.offsetHeight - target.offsetHeight)
  // )}px`; // Задаем случайное значение для вертикальной координаты мишени
  // target.style.left = `${Math.floor(
  //   Math.random() * (gameContainer.offsetWidth - target.offsetWidth)
  // )}px`; // Задаем случайное значение для горизонтальной координаты мишени



  target.addEventListener("click", hitTarget); // Добавляем обработчик события клика на мишень
  gameContainer.appendChild(target); // Добавляем мишень в контейнер игры

  const speed = getSpeed(); // Получаем скорость создания новой мишени
  setTimeout(() => { // Устанавливаем таймер на удаление мишени через определенное время  

    gameContainer.removeChild(target); // Удаляем мишень из контейнера игры 
    if (lives > 0) { // Если остались жизни, то создаем новую мишень и уменьшаем количество жизней на 1
      createTarget();
      lives--;
      livesSelect.value = lives;
    } else {  // Если жизней не осталось, то выводим сообщение об окончании игры и сбрасываем все настройки игры
      alert(`Game over! Your score is ${score}`);
      resetGame();
      score = 0; // Сбрасываем количество очков
    }
  }, speed);
}
 







function getSpeed() {
  // Функция для получения скорости создания новой мишени в зависимости от выбранной пользователем скорости
  const speed = speedSelect.value; // Получаем значение выбранной скорости из DOM
  switch (
    speed // Определяем скорость в зависимости от значения выбранной скорости
  ) {
    case "slow":
      return 3000;
    case "medium":
      return 2000;
    case "fast":
      return 1000;
  }
}

function hitTarget() {  // Функция для обработки попадания в мишень и проигрывания звука выстрела
  score++; // Увеличиваем количество очков на 1
  scoreDisplay.textContent = `${score}`; // обновления отображения текущего счета !!!!!!
  this.removeEventListener("click", hitTarget); // Удаляем обработчик события клика на мишень
  const target = this;
  target.classList.add("explode");
  const audio = new Audio("gunshot.mp3"); // Создаем новый объект аудио для проигрывания звука выстрела
  audio.play(); // Проигрываем звук выстрела
  setTimeout(() => {
    gameContainer.removeChild(target); // Удаляем мишень из контейнера игры
  }, 200);
  createTarget(); // Создаем первую мишень
}

function resetGame() { // Функция для сброса настроек игры
  lives = parseInt(livesSelect.value); // Сбрасываем количество жизней, преобразовав строковое значение в число
  livesSelect.disabled = false; // Разблокируем выбор количества жизней
}

function startGame() {    // Функция для начала игры
  resetGame(); // Сбрасываем все настройки игры
  livesSelect.disabled = true; // Блокируем выбор количества жизней
  createTarget(); // Создаем первую мишень
}

document.addEventListener("DOMContentLoaded", () => {  // Добавляем обработчик события загрузки страницы
  document.getElementById("startButton")
    .addEventListener("click", startGame); // Добавляем обработчик события клика на кнопку начала игры
});
