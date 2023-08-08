export default class Slider {
  #imageSlider;
  #images;
  #dots;
  #displayedImage;

  constructor(el) {
    this.#imageSlider = document.createElement('div');
    this.#imageSlider.className = 'images';

    this.#displayedImage = 0;
    this.#images = [];

    const sliderNavigation = document.createElement('span');
    sliderNavigation.className = 'slider-navigation';
    this.#dots = document.createElement('span');

    const prevButton = document.createElement('button');
    prevButton.innerText = '<-';
    const nextButton = document.createElement('button');
    nextButton.innerText = '->';
    nextButton.onclick = () => this.next();

    sliderNavigation.append(prevButton, this.#dots, nextButton);
    el.append(this.#imageSlider, sliderNavigation);
  }

  addImage(imageEl) {
    this.#imageSlider.appendChild(imageEl);
    this.#images.push(imageEl)

    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.innerText = 'o';
    const i = this.#images.length - 1;
    this.#images[i].style.opacity = '0';
    dot.onclick = () => this.displayImage(i);
    this.#dots.appendChild(dot);
  }

  displayImage(i) {
    this.#images[this.#displayedImage].style.opacity = '0';
    this.#images[i].style.opacity = '1';
    this.#dots.children[this.#displayedImage].innerText = 'o';
    this.#dots.children[i].innerText = '.';
    this.#displayedImage = i;
  }

  next() {
    this.displayImage(this.#displayedImage < this.#images.length - 1 ? this.#displayedImage + 1 : 0);
  }
}
