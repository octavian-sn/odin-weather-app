// Fetch data and render it
const getWeather = async (city = "bucharest") => {
  try {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4582435a7f2223f287d52a8bb97ca5e6&units=metric`,
      { mode: "cors" }
    );
    const response = await request.json();
    const newData = processData(response);
    displayData(newData);
  } catch {
    console.log("yes");
  }
};

// Process Sunrise and Sundown times
const sunSetRis = (a) => {
  let date = new Date(a * 1000);
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (hour.toString().length === 1) {
    hour = "0" + hour;
  }
  let time = hour + ":" + minute;
  return time;
};

// Create an object with necessary data from the fetch
const processData = (data) => {
  const information = {
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    main: data.weather[0].description,
    country: data.sys.country + ", ",
    region: data.name,
    temp: data.main.temp,
    feel: data.main.feels_like,
    high: data.main.temp_max,
    low: data.main.temp_min,
    wind: data.wind.speed + " m/s",
    humidity: data.main.humidity + " %",
    up: sunSetRis(data.sys.sunrise),
    down: sunSetRis(data.sys.sunset),
  };
  return information;
};

// Display weather data
const displayData = (obj) => {
  const icon = document.getElementById("icon");
  const main = document.getElementById("main");
  const country = document.getElementById("country");
  const region = document.getElementById("region");
  const temp = document.getElementById("temp");
  const feel = document.getElementById("feel");
  const high = document.getElementById("high");
  const low = document.getElementById("low");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");
  const up = document.getElementById("up");
  const down = document.getElementById("down");
  const fields = [
    main,
    country,
    region,
    temp,
    feel,
    high,
    low,
    wind,
    humidity,
    up,
    down,
  ];
  // Loop through fields and object data and fill in if they match
  fields.forEach((field) => {
    for (const key in obj) {
      if (key == field.id) {
        field.innerText = obj[key];
      }
    }
  });
  // Change Icon
  icon.src = obj.icon;
};

const toFahrenheit = a => {
  let value = (a * 1.8) + 32;
  return Math.floor(value * 100) / 100
}
const toCelsius = b => {
  let value = (b - 32) * 0.5556;
  return Math.floor(value * 100) / 100
}

const chageMeasureUnit = () => {
  const control = document.querySelector('#temp').nextElementSibling;
  const units = document.querySelectorAll('.unit');
  const temperatures = document.querySelectorAll('.temperature');
  temperatures.forEach(temp => {
    let value = temp.innerText;
    console.log(control.innerText);
    control.innerText === '℃' ? temp.innerText = toFahrenheit(value) : temp.innerText = toCelsius(value);
  })
  units.forEach(unit => {
    unit.innerText === '℃' ? unit.innerText = '℉' : unit.innerText = '℃';
  })
}

const changeUnit = document.getElementById('unit-change');
changeUnit.addEventListener('click', ()=> {
  chageMeasureUnit();
})

// Search when pressing enter
const search = document.querySelector("#search");
search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(search.value);
  }
});

// Default search on city of Sibiu from Romania
getWeather("sibiu");
