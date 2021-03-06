const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

getWeather = async () => {
  try {
    await delay(10000);
    const response = await fetch(
      "https://api.oceandrivers.com:443/v1.0/getEasyWind/EW013/?period=latestdata"
    );
    const weather = await response.json();

    console.log("Getting Weather Info");

    return weather;
  } catch (err) {
    // handle error
    console.error(err);
  }
};

getPower = async () => {
  try {
    // await delay(2000);
    let powerInfo = {
      batteries: "good",
      breakers: "good",
      voltage: "26.7v",
    };

    console.log("Getting Power Info");

    return powerInfo;
  } catch (err) {
    console.error(err);
  }
};

getWater = async () => {
  try {
    // await delay(3000);
    let waterInfo = {
      water_level: "good",
      water_quality: "good",
    };

    console.log("Getting Water Info");

    return waterInfo;
  } catch (err) {
    console.error(err);
  }
};

getInternet = async () => {
  try {
    await delay(5000);
    let internetInfo = {
      isp: "Comcast",
      speed: "1000 mbps",
      internet_health: "good",
    };

    console.log("Getting Internet Info");

    return internetInfo;
  } catch (err) {
    console.error(err);
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/", (req, res) => {
  const viewData = {};

  (async () => {
    console.time("Execution Time");

    const powerInfo = await getPower();
    const waterInfo = await getWater();
    const internetInfo = await getInternet();

    console.timeEnd("Execution Time");

    viewData["powerInfo"] = powerInfo;
    viewData["waterInfo"] = waterInfo;
    viewData["internetInfo"] = internetInfo;

    res.render("index", viewData);
  })();
});

app.get("/getWeather", (req, res) => {
  (async () => {
    const weatherInfo = await getWeather();
    res.json(weatherInfo);
  })();
});

module.exports = app;
