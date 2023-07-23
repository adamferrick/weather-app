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

    this.#sky = document.createElement("div");
    this.#sky.style.width = "100vw";
    this.#sky.style.height = "100vh";
    this.#sky.style.zIndex = "inherit";
    this.#sky.style.position = "fixed";
    el.prepend(this.#sky);
    this.#backShadow = this.el.querySelector("#back-shadow");
    this.#backFace = this.el.querySelector("#back-face");
    this.#frontShadow = this.el.querySelector("#front-shadow");
    this.#frontFace = this.el.querySelector("#front-face");
  }

  changeColor(color) {
    this.#sky.style.backgroundColor = color.mix(this.base, 0.95);
    this.#backShadow.style.fill = color.mix(this.base, 0.9);
    this.#backFace.style.fill = color.mix(this.base, 0.6);
    this.#frontShadow.style.fill = color.mix(this.base, 0.85);
    this.#frontFace.style.fill = color.mix(this.base, 0.55);
  }
}
