import thermometerRaw from "./thermometer.svg";

export default class Thermometer {
  #column;

  constructor(element) {
    element.innerHTML = thermometerRaw;
    this.#column = element.querySelector("#column");
  }
}
