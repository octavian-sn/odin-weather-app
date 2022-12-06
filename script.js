const getWeather = async (city = "bucharest") => {
  try {
    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4582435a7f2223f287d52a8bb97ca5e6&units=metric`,
      { mode: "cors" }
    );
    const response = await request.json();
    processData(response)
  } catch {
    console.log('yes')
  }
};

const sunSetRis = (a) => {
  let timeStamp = a;
  let date = new Date(timeStamp * 1000);
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (hour.toString().length === 1) {
    hour = "0" + hour;
  }
  let time = hour + ":" + minute;
  return time;
};

const processData = async (data) => {
  const information = {
    short: data.weather[0].description,
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    country: data.sys.country + ', ',
    city: data.name,
    temp: data.main.temp,
    feels: data.main.feels_like,
    max: data.main.temp_max,
    min: data.main.temp_min,
    wind: data.wind.speed + ' m/s',
    humidity: data.main.humidity + ' %',
    up: sunSetRis(data.sys.sunrise),
    down: sunSetRis(data.sys.sunset),
  };
  console.log(data);
  console.log(information);
};

const search = document.querySelector('#search');
search.addEventListener('keypress', (e)=> {
  if (e.key === 'Enter') {
    getWeather(search.value)
  }
});


