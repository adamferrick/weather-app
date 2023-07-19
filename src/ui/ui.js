import Color from "color";

import Thermometer from "./thermometer.js";
import Background from "./background.js";
import mountainsRaw from "./mountains.svg";

const baseBlue = Color("#396c9e");
const baseRed = Color("#b3451d");
const secondsInDay = 86400;

function getColor(time) {
  const date = new Date(time);
  const numSeconds =
    date.getSeconds() + 60 * date.getMinutes() + 60 * 60 * date.getHours();
  return baseRed.mix(baseBlue, Math.abs(0.5 - numSeconds / secondsInDay) * 2);
}

export default class Ui {
  #elements;
  #thermometer;
  #background;

  constructor(weatherCb, selectors) {
    // create a new object of elements from the passed object of selectors
    this.#elements = Object.fromEntries(
      Object.entries(selectors).map(([k, v]) => [k, document.querySelector(v)]),
    );

    this.#elements.form.onsubmit = (e) => {
      e.preventDefault();
      weatherCb(this.#elements.input.value);
    };

    this.#thermometer = new Thermometer(this.#elements.thermometer);
    this.#background = new Background(this.#elements.background, mountainsRaw);

    this.#background.draw();
  }

  updateInfo(location, last_updated, temp, humidity, wind) {
    this.#elements.location.textContent = `${location.name}, ${location.region}, ${location.country}`;
    this.#elements.last_updated.textContent = `${last_updated}`;
    this.#elements.temp.textContent = `${temp.c}deg Celsius, ${temp.f}deg Fahrenheit`;
    this.#elements.humidity.textContent = `${humidity}`;
    this.#elements.wind.textContent = `${wind.mph}mph ${wind.dir} (${wind.kph}kph)`;
    this.#thermometer.fillMercury(temp.c);

    document.documentElement.style.setProperty(
      "--foreground-alt",
      getColor(last_updated),
    );
  }
}
