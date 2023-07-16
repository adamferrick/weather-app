export default class Ui {
  #elements;

  constructor(weatherCb, selectors) {
    // create a new object of elements from the passed object of selectors
    this.#elements = Object.fromEntries(
      Object.entries(selectors).map(([k, v]) => [k, document.querySelector(v)]),
    );

    this.#elements.form.onsubmit = (e) => {
      e.preventDefault();
      weatherCb(this.#elements.input.value);
    };
  }
}
