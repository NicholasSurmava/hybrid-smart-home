(() => {
  getWeather = () => {
    try {
      console.log("Getting weather!");

      fetch("/getWeather")
        .then((response) => response.json())
        .then((weather) => {
          console.log(weather);
          const temp_el = document.querySelector(
            '[data-js="weather__temperature"]'
          );
          const time_el = document.querySelector('[data-js="weather__time"]');
          const lat_el = document.querySelector(
            '[data-js="weather__latitude"]'
          );
          const long_el = document.querySelector(
            '[data-js="weather__longitude"]'
          );

          temp_el.innerHTML = `TEMPERATURE ${weather.TEMPERATURE} C`;
          time_el.innerHTML = `TIME ${weather.TIME_STRING}`;
          lat_el.innerHTML = `LATITUDE ${weather.LATITUDE}`;
          long_el.innerHTML = `LONGITUDE ${weather.LONGITUDE}`;
        });
    } catch (err) {
      console.error(err);
    }
  };

  getWeather();
})();
