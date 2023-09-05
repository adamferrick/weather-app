import Color from "color";
import mountainsRaw from "./mountains.svg";
import planetsRaw from "./planets.svg";
import treeRaw from "./tree.svg";

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

  changeColor(color = this.#base) {
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
    this.update();
  }

  update(color = this.base) {
    this.#sky.changeColor(color);
    this.#backShadow.style.fill = color.mix(this.base, 0.9);
    this.#backFace.style.fill = color.mix(this.base, 0.6);
    this.#frontShadow.style.fill = color.mix(this.base, 0.85);
    this.#frontFace.style.fill = color.mix(this.base, 0.55);
  }
}

export class Planets extends Background {
  #sky;
  #planet;
  #moon1;
  #moon2;

  constructor(el, base) {
    super(el, base, planetsRaw);
    const skyEl = document.createElement("div");
    this.#sky = new Sky(skyEl, base);
    el.prepend(skyEl);
    this.#planet = {
      base: this.el.querySelector("#path35186"),
      highlight: this.el.querySelector("#circle5740"),
    };
    this.#moon1 = {
      base: this.el.querySelector("#circle29802"),
      highlight: this.el.querySelector("#path304"),
    };
    this.#moon2 = {
      base: this.el.querySelector("#path30241"),
      highlight: this.el.querySelector("#circle31349"),
    };
    this.update();
  }

  update(color = this.base) {
    this.#sky.changeColor(color);
    this.#planet.base.style.fill = color.mix(this.base, 0.7);
    this.#planet.highlight.style.fill = color.mix(this.base, 0.5);
    this.#moon1.base.style.fill = color.mix(this.base, 0.6);
    this.#moon1.highlight.style.fill = color.mix(this.base, 0.4);
    this.#moon2.base.style.fill = color.mix(this.base, 0.65);
    this.#moon2.highlight.style.fill = color.mix(this.base, 0.45);
  }
}

export class Tree extends Background {
  #sky;
  #hill;
  #tree;

  constructor(el, base) {
    super(el, base, treeRaw);
    const skyEl = document.createElement("div");
    this.#sky = new Sky(skyEl, base);
    el.prepend(skyEl);
    this.#hill = {
      base: this.el.querySelector("#path387"),
      highlight: this.el.querySelector("#path383"),
    };
    this.#tree = {
      branches: this.el.querySelector("#path9268"),
      brightLeaves: this.el.querySelector("#path6776"),
      darkLeaves: this.el.querySelector("#path6890"),
    };
  }

  update(color = this.base) {
    this.#sky.changeColor(color);
    this.#hill.base.style.fill = color.mix(this.base, 0.8);
    this.#hill.highlight.style.fill = color.mix(this.base, 0.7);
    this.#tree.branches.style.fill = color;
    this.#tree.brightLeaves.style.fill = color.mix(this.base, 0.75);
    this.#tree.darkLeaves.style.fill = color.mix(this.base, 0.65);
  }
}
