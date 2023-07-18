export default class Background {
  #backgroundElement;
  #rawSvg;
  constructor(element, rawSvg) {
    this.#backgroundElement = element;
    this.#rawSvg = rawSvg;
  }

  draw() {
    this.#backgroundElement.innerHTML = this.#rawSvg;
  }
}
