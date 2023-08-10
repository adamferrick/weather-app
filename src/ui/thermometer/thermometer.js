import thermometerRaw from "./thermometer.svg";

const MERCURY_MAX_HEIGHT = 48;
const MERCURY_MIN_HEIGHT = 7;
const MERCURY_DEFAULT_Y = 45;

export default class Thermometer {
  #column;

  constructor(element) {
    element.innerHTML = thermometerRaw;
    this.#column = element.querySelector("#column");
  }

  fillMercury(temp_c) {
    const height = Math.max(
      MERCURY_MIN_HEIGHT,
      Math.min(MERCURY_MAX_HEIGHT, temp_c),
    );
    this.#column.setAttribute("height", height);
    this.#column.setAttribute(
      "y",
      MERCURY_DEFAULT_Y - (height - MERCURY_MIN_HEIGHT),
    );
  }
}
