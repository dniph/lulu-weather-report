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


updateTempDisplay();
