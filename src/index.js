import "./style.css";
import Ui from "./ui/ui.js";

async function getWeatherData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=0001225ccbc04302a21222206230207&q=${location}&aqi=no`,
    { mode: "cors" },
  );

  const weather = await response.json();

  return weather;
}

class App {
  #ui;

  constructor() {
    this.#ui = new Ui((l) => this.update(l), {
      form: "form",
      input: "input",
      location: "#location span",
      last_updated: "#last-updated span",
      temp: "#temp span",
      humidity: "#humidity span",
      wind: "#wind span",
    });
  }

  async update(location) {
    const data = await getWeatherData(location);
    this.#ui.fillText(
      {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
      },
      data.current.last_updated,
      { c: data.current.temp_c, f: data.current.temp_f },
      data.current.humidity,
      {
        kph: data.current.wind_kph,
        mph: data.current.wind_mph,
        dir: data.current.wind_dir,
      },
    );
  }
}

const app = new App();
