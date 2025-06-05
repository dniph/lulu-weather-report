//Global state variable for temperature
let state = {
  temperatureK: 294.15, // Valor inicial en °K
  isCelsius: true
};
//Get the:
//Temperature and state values 
const tempValue = document.getElementById("tempValue");
const landscape = document.getElementById("landscape");
//Increase and decrease buttons
const increaseBtn = document.getElementById("increaseTempControl");
const decreaseBtn = document.getElementById("decreaseTempControl");
// Handles Input related with the city 
const headerCityName = document.getElementById("headerCityName");
const cityNameInput = document.getElementById("cityNameInput");
const cityNameReset = document.getElementById("cityNameReset");
// Gets the temperature 
const currentTempButton = document.getElementById("currentTempButton");
//Convert C/F 
const convertTempButton = document.getElementById("convertTempButton");
// Select bar 
const skySelect = document.getElementById("skySelect");
const skyDisplay = document.getElementById("sky");


//function for update the temperature and display
const updateTempDisplay = () => {
const {isCelsius, temperatureK} = state;
let temperature;
if (isCelsius){
  temperature = getTempInCelsius();
} else {
  temperature = getTempInFahrenheit();
}
  // const temperature = state.temperature;
  tempValue.textContent = isCelsius ? `${temperature}°C` : `${temperature}°F`;
  
  if (temperatureK >= 300.15) {
    tempValue.className = "red";
    landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  } else if (temperatureK >= 294.15) {
    tempValue.className = "orange";
    landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  } else if (temperatureK >= 288.15) {
    tempValue.className = "yellow";
    landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temperatureK >= 283.15) {
    tempValue.className = "green";
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    tempValue.className = "teal";
    landscape.textContent = "🌲🌲⛄️🌲❄️🌬️⛄️🌲❄️⛄️🌲";
  }
};

const updateSky = () => {
  const sky = skySelect.value;

  if (sky === "sunny") {
    skyDisplay.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
  } else if (sky === "cloudy") {
    skyDisplay.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
  } else if (sky === "rainy") {
    skyDisplay.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
  } else if (sky === "snowy") {
    skyDisplay.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
  } else {
    skyDisplay.textContent = ""; // default vacío si no hay selección
  }
};

const convertTemp = () => {
  const temperatureHeader = document.getElementById("temperatureHeader");

  state.isCelsius = !state.isCelsius;

  if (state.isCelsius) {
    convertTempButton.textContent = "Convert to °F";
    temperatureHeader.textContent = "Temperature (°C)";
  } else {
    convertTempButton.textContent = "Convert to °C";
    temperatureHeader.textContent = "Temperature (°F)";
  }

  updateTempDisplay();
};
//Auxiliar function for C and F 
const getTempInCelsius = () => Math.round(state.temperatureK - 273.15);
const getTempInFahrenheit = () => Math.round((state.temperatureK - 273.15) * 9/5 + 32);
const getCelsiusToKelvin = ( temperatureC) => temperatureC + 273.15;
const getFahrenheitToKelvin = (temperatureF) => ((temperatureF - 32) * 5) / 9 + 273.15;


//Listeners

//Increase temperature with button
increaseBtn.addEventListener("click", () => {
  
  if (state.isCelsius){
    let temp = getTempInCelsius();
    temp ++;
    state.temperatureK = getCelsiusToKelvin(temp);
  } else {
    let temp = getTempInFahrenheit();
    temp ++
    state.temperatureK = getFahrenheitToKelvin(temp);
  }
  updateTempDisplay();
});

// Decrease temperature with button
decreaseBtn.addEventListener("click", () => {
  if (state.isCelsius){
    let temp = getTempInCelsius();
    temp --;
    state.temperatureK = getCelsiusToKelvin(temp);
  } else {
    let temp = getTempInFahrenheit();
    temp --;
    state.temperatureK = getFahrenheitToKelvin(temp);
  }
  updateTempDisplay();
});

// Update the name of the city in real time
cityNameInput.addEventListener("input", () => {
  headerCityName.textContent = cityNameInput.value;
  
});

// Reset name of the city clicking the button "Reset"
cityNameReset.addEventListener("click", () => {
  cityNameInput.value = "Seattle";
  headerCityName.textContent = "Seattle";
});

skySelect.addEventListener("change", updateSky);

currentTempButton.addEventListener("click", async () => {
  const city = headerCityName.textContent || "Seattle"; // default en caso de estar vacío

  try {
    // Paso 1: Obtener lat y lon
    const locationRes = await axios.get('https://lulu-weather-locations-app-bddkhmhtetfbbzf6.canadacentral-01.azurewebsites.net//location', {
      params: {
        q: city
      }
    });

    const { lat, lon } = locationRes.data[0];

    // Paso 2: Obtener clima actual
    const weatherRes = await axios.get(`https://lulu-weather-locations-app-bddkhmhtetfbbzf6.canadacentral-01.azurewebsites.net//weather`, {
      params: {
        lat,
        lon,
      },
    });
    
    // Paso 3: Convertir de Kelvin a Celsius
    const kelvinTemp = weatherRes.data.main.temp;
    const celsiusTemp = Math.round(kelvinTemp - 273.15);

    // Paso 4: Actualizar estado y UI
    state.temperatureK = kelvinTemp;
    updateTempDisplay();
  } catch (error) {
    console.error("Error fetching temperature:", error);
  }
});

convertTempButton.addEventListener("click", convertTemp);

updateTempDisplay();
updateSky();