import leftRaw from './left.svg';
import rightRaw from './right.svg';
import dotRaw from './dot.svg';

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
    sliderNavigation.className = 'slider-navigation panel';
    this.#dots = document.createElement('span');

    const prevButton = document.createElement('button');
    prevButton.innerHTML = leftRaw;
    prevButton.onclick = () => this.prev();
    const nextButton = document.createElement('button');
    nextButton.innerHTML = rightRaw;
    nextButton.onclick = () => this.next();

    sliderNavigation.append(prevButton, this.#dots, nextButton);
    el.append(this.#imageSlider, sliderNavigation);
  }

  addImage(imageEl) {
    this.#imageSlider.appendChild(imageEl);
    this.#images.push(imageEl)

    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.innerHTML = dotRaw;
    const i = this.#images.length - 1;
    this.#images[i].style.opacity = '0';
    dot.onclick = () => this.displayImage(i);
    this.#dots.appendChild(dot);
  }

  displayImage(i) {
    this.#images[this.#displayedImage].style.opacity = '0';
    this.#images[i].style.opacity = '1';
    this.#dots.children[this.#displayedImage].classList.remove('displayed');
    this.#dots.children[i].classList.add('displayed');
    this.#displayedImage = i;
  }

  prev() {
    this.displayImage(this.#displayedImage > 0 ? this.#displayedImage - 1 : this.#images.length - 1);
  }

  next() {
    this.displayImage(this.#displayedImage < this.#images.length - 1 ? this.#displayedImage + 1 : 0);
  }
}
