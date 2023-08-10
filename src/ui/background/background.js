import Color from "color";
import mountainsRaw from "./mountains.svg";
import planetsRaw from "./planets.svg";

function fadeBackground(element, newBackground, dur) {
  let temp = element.cloneNode(true);
  element.style.background = newBackground;
  temp.addEventListener("transitionend", (e) => e.target.remove());
  temp.style.transition = `opacity ${dur}s ease-in-out`;
  element.after(temp);
  setTimeout(() => (temp.style.opacity = 0));
}

class Sky {
  #el;
  #base;

  constructor(el, base) {
    this.#el = el;
    this.#el.style.width = "100vw";
    this.#el.style.height = "100vh";
    this.#el.style.zIndex = "inherit";
    this.#el.style.position = "fixed";
    this.#el.style.top = "0px";
    this.#el.style.left = "0px";
    this.#base = new Color(base);
  }

  changeColor(color) {
    fadeBackground(
      this.#el,
      `linear-gradient(to bottom, ${color.mix(this.#base, 0.7)}, ${this.#base})`,
      0.2,
    );
  }
}

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

    const skyEl = document.createElement("div");
    this.#sky = new Sky(skyEl, base);
    el.prepend(skyEl);
    this.#backShadow = this.el.querySelector("#back-shadow");
    this.#backFace = this.el.querySelector("#back-face");
    this.#frontShadow = this.el.querySelector("#front-shadow");
    this.#frontFace = this.el.querySelector("#front-face");
  }

  changeColor(color) {
    this.#sky.changeColor(color);
    this.#backShadow.style.fill = color.mix(this.base, 0.9);
    this.#backFace.style.fill = color.mix(this.base, 0.6);
    this.#frontShadow.style.fill = color.mix(this.base, 0.85);
    this.#frontFace.style.fill = color.mix(this.base, 0.55);
  }
}

export class Planets extends Background {
  #sky;
  constructor(el, base) {
    super(el, base, planetsRaw);
    const skyEl = document.createElement("div");
    this.#sky = new Sky(skyEl, base);
    el.prepend(skyEl);
  }

  changeColor(color) {
    this.#sky.changeColor(color);
  }
}
