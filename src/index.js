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
    this.#ui = new Ui(this.update, {
      form: "form",
      input: "input",
    });
  }

  async update(location) {
    const data = await getWeatherData(location);
    console.log(data);
  }
}

const app = new App();
