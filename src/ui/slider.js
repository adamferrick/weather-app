export default class Slider {
  #imageSlider;
  #images;
  #dots;

  constructor(el) {
    this.#imageSlider = document.createElement('div');
    this.#imageSlider.className = 'images';

    this.#images = [];

    const sliderNavigation = document.createElement('span');
    sliderNavigation.className = 'slider-navigation';
    this.#dots = document.createElement('span');

    const prevButton = document.createElement('button');
    prevButton.innerText = '<-';
    const nextButton = document.createElement('button');
    nextButton.innerText = '->';

    sliderNavigation.append(prevButton, this.#dots, nextButton);
    el.append(this.#imageSlider, sliderNavigation);
  }

  addImage(imageEl) {
    this.#imageSlider.appendChild(imageEl);
    this.#images.push(imageEl)

    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.innerText = 'o';
    this.#dots.appendChild(dot);
  }
}
