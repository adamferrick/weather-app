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

  constructor(el, base) {
    super(el, base, mountainsRaw);

    this.#sky = this.el.querySelector("#sky");
  }

  changeColor(color) {
    this.#sky.style.fill = color.mix(this.base, 0.8);
  }
}
