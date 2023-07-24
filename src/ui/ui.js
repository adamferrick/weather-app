import Color from "color";

import Thermometer from "./thermometer.js";
import { Mountains } from "./background.js";

const secondsInDay = 86400;

function heightOfSun(dateRaw) {
  const date = new Date(dateRaw);
  const numSeconds =
    date.getSeconds() + 60 * date.getMinutes() + 60 * 60 * date.getHours();
  return Math.abs(0.5 - numSeconds / secondsInDay) * 2;
}

export default class Ui {
  #elements;
  #thermometer;
  #background;
  #nightColor;
  #dayColor;

  constructor(baseColor, nightColor, dayColor, weatherCb, selectors) {
    // create a new object of elements from the passed object of selectors
    this.#elements = Object.fromEntries(
      Object.entries(selectors).map(([k, v]) => [k, document.querySelector(v)]),
    );

    this.#elements.form.onsubmit = (e) => {
      e.preventDefault();
      weatherCb(this.#elements.input.value);
    };

    this.#nightColor = Color(nightColor);
    this.#dayColor = Color(dayColor);

    this.#thermometer = new Thermometer(this.#elements.thermometer);
    this.#background = new Mountains(this.#elements.background, baseColor);
    this.#background.changeColor(new Color(nightColor));
  }

  updateInfo(location, last_updated, temp, humidity, wind) {
    this.#elements.location.textContent = `${location.name}, ${location.region}, ${location.country}`;
    this.#elements.last_updated.textContent = `${last_updated}`;
    this.#elements.temp.textContent = `${temp.c}deg Celsius, ${temp.f}deg Fahrenheit`;
    this.#elements.humidity.textContent = `${humidity}`;
    this.#elements.wind.textContent = `${wind.mph}mph ${wind.dir} (${wind.kph}kph)`;
    this.#thermometer.fillMercury(temp.c);

    const color = this.#dayColor.mix(
      this.#nightColor,
      heightOfSun(last_updated),
    );

    document.documentElement.style.setProperty("--foreground-alt", color);

    this.#background.changeColor(color);
  }
}
