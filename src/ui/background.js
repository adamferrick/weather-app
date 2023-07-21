import Color from "color";
import mountainsRaw from "./mountains.svg";

class Background {
  el;
  base;

  constructor(el, base, rawSvg) {
    this.el = el;
    this.el.innerHTML = rawSvg;
    this.base = new Color(base);
  }
}

export class Mountains extends Background {
  #sky;
  #backShadow;
  #backFace;
  #frontShadow;
  #frontFace;

  constructor(el, base) {
    super(el, base, mountainsRaw);

    this.#sky = this.el.querySelector("#sky");
    this.#backShadow = this.el.querySelector("#back-shadow");
    this.#backFace = this.el.querySelector("#back-face");
    this.#frontShadow = this.el.querySelector("#front-shadow");
    this.#frontFace = this.el.querySelector("#front-face");
  }

  changeColor(color) {
    this.#sky.style.fill = color.mix(this.base, 0.95);
    this.#backShadow.style.fill = color.mix(this.base, 0.9);
    this.#backFace.style.fill = color.mix(this.base, 0.6);
    this.#frontShadow.style.fill = color.mix(this.base, 0.85);
    this.#frontFace.style.fill = color.mix(this.base, 0.55);
  }
}
