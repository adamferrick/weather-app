import Thermometer from "./thermometer.js";

export default class Ui {
  #elements;
  #thermometer;

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
  }

  fillText(location, last_updated, temp, humidity, wind) {
    this.#elements.location.textContent = `${location.name}, ${location.region}, ${location.country}`;
    this.#elements.last_updated.textContent = `${last_updated}`;
    this.#elements.temp.textContent = `${temp.c}deg Celsius, ${temp.f}deg Fahrenheit`;
    this.#elements.humidity.textContent = `${humidity}`;
    this.#elements.wind.textContent = `${wind.mph}mph ${wind.dir} (${wind.kph}kph)`;
  }
}
