import mountainsRaw from "./mountains.svg";

class Background {
  #el;

  constructor(el, rawSvg) {
    this.#el = el;
    this.#el.innerHTML = rawSvg;
  }
}

export class Mountains extends Background {
  constructor(el) {
    super(el, mountainsRaw);
  }
}
