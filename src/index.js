import "./style.css";
import Ui from "./ui/ui.js";

class App {
  #ui;

  constructor() {
    this.#ui = new Ui(this.getWeatherData, {
      form: "form",
      input: "input",
    });
  }

  async getWeatherData(location) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=0001225ccbc04302a21222206230207&q=${location}&aqi=no`,
      { mode: "cors" },
    );

    const weather = await response.json();

    return weather;
  }
}

const app = new App();
