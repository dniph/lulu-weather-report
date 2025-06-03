//Global state variable for temperature
let state = {
  temperature: 21 // Valor inicial en °C
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

//function for update the temperature and display
const updateTempDisplay = () => {
  const temp = state.temperature;
  tempValue.textContent = `${temp}°C`;

  if (temp >= 27) {
    tempValue.className = "red";
    landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  } else if (temp >= 21) {
    tempValue.className = "orange";
    landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  } else if (temp >= 15) {
    tempValue.className = "yellow";
    landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temp >= 10) {
    tempValue.className = "green";
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    tempValue.className = "teal";
    landscape.textContent = "🌲🌲⛄️🌲❄️🌬️⛄️🌲❄️⛄️🌲";
  }
};


//Listeners

//Increase temperature with button
increaseBtn.addEventListener("click", () => {
  state.temperature += 1;
  updateTempDisplay();
});

// Decrease temperature with button
decreaseBtn.addEventListener("click", () => {
  state.temperature -= 1;
  updateTempDisplay();
});

// Update the name of the city in real time
cityNameInput.addEventListener("input", () => {
  headerCityName.textContent = cityNameInput.value;
});

// Reset name of the city clicking the button "Reset"
cityNameReset.addEventListener("click", () => {
  cityNameInput.value = "";
  headerCityName.textContent = "";
});

currentTempButton.addEventListener("click", async () => {
  const city = headerCityName.textContent || "Seattle"; // default en caso de estar vacío

  try {
    // Paso 1: Obtener lat y lon
    const locationRes = await axios.get('http://127.0.0.1:5000/location', {
      params: {
        q: city
      }
    });

    const { lat, lon } = locationRes.data[0];

    // Paso 2: Obtener clima actual
    const weatherRes = await axios.get(`http://127.0.0.1:5000/weather`, {
      params: {
        lat,
        lon,
      },
    });

    // Paso 3: Convertir de Kelvin a Celsius
    const kelvinTemp = weatherRes.data.main.temp;
    const celsiusTemp = Math.round(kelvinTemp - 273.15);

    // Paso 4: Actualizar estado y UI
    state.temperature = celsiusTemp;
    updateTempDisplay();
  } catch (error) {
    console.error("Error fetching temperature:", error);
  }
});

updateTempDisplay();
