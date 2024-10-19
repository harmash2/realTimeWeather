const API_KEY = '9b689c1f2690298dd0a6c764968f596b';

const weatherForm = document.querySelector('.input__container');
const cityInput = document.querySelector('.input__search');
const card = document.querySelector('.card');
const button = document.querySelector('.input__button__shadow');

weatherForm.addEventListener('submit', async function(ev) {
  ev.preventDefault();

  const city = cityInput.value;

  if(city) {
    try {

      const weatherData = await getWeatherData(city);
      console.log(weatherData);
      renderData(weatherData);
    
    } catch(error){
      console.error(error);
      renderError(error)
    }
  } else {
    renderError('Enter your city correct')
  }
});

async function getWeatherData(city) {
  const dataJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = dataJson.json();
  return data;
};

function renderData(data) {
  const renderingStr = `
    <h1 class="city">${data.name}</h1>
    <p class="temperature">${Math.floor(data.main.temp)} &#176;C</p>
    <p class="humidity">Humidity: ${data.main.humidity}%</p>
    <p class="descripttion">${data.weather[0].description}</p>
    <p class="weather-emoji">${getCorrectEmoji(data.weather[0].id)}</p>
  `;
  card.style.display = 'flex';
  card.innerHTML = renderingStr;
};

function getCorrectEmoji(weatherId){
  switch(true){
    case(weatherId >= 200 && weatherId < 300):
      return '⛈';
    case(weatherId >= 300 && weatherId < 400):
      return '🌧';
    case(weatherId >= 500 && weatherId < 600):
      return '⛈';
    case(weatherId >= 600 && weatherId < 700):
      return '🌨';
    case(weatherId >= 700 && weatherId < 800):
      return '🌫';
    case(weatherId === 800):
      return '☀';
    case(weatherId >= 801 && weatherId < 810):
      return '☁';
    default:
      return '❔';
    };
};

function renderError(msg) {
  const errorMsg = document.createElement('p');
  errorMsg.classList.add('errorDisplay');
  errorMsg.textContent = msg;

  card.textContent = '';
  card.style.display = 'flex';
  card.appendChild(errorMsg);
};
